const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const BASE_URL = 'https://admin.drug-international.com/api/GetProductByTrade';
const SINGLE_PRODUCT_URL = 'https://admin.drug-international.com/api/GetSingleProduct';
const OUTPUT_DIR = path.join(__dirname, '../../data');
const OUTPUT_TS = path.join(OUTPUT_DIR, 'drugInternationalProducts.ts');

// Add delay between API calls
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchFromAPI(url, options = {}) {
  try {
    const response = await axios({
      method: options.method || 'GET',
      url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ...options.headers,
      },
      ...options,
      timeout: 30000,
    });
    return response.data;
  } catch (error) {
    console.error(`API request failed for ${url}:`, error.message);
    throw error;
  }
}

async function fetchProductsByLetter(letter) {
  try {
    const url = `${BASE_URL}/${letter.toLowerCase()}`;
    const data = await fetchFromAPI(url);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching products for letter ${letter}:`, error.message);
    return [];
  }
}

async function fetchProductDetails(product) {
  try {
    const url = `${SINGLE_PRODUCT_URL}/${product.MEDICINE_ID}`;
    const data = await fetchFromAPI(url);
    if (!Array.isArray(data) || data.length === 0) return null;
    
    const details = data[0];
    const baseUrl = 'https://www.admin.drug-international.com';
    
    return {
      id: details.MEDICINE_ID,
      name: details.MEDICINE_NAME,
      description: details.MEDICINE_DESC || '',
      strength: details.STRENGTH || '',
      uom: details.UOM_NAME || '',
      categoryId: details.TH_GRP_ID || product.CAT_ID || '',
      insertFile: details.INSERT_FILE 
        ? `${baseUrl}/${details.INSERT_FILE.replace(/\\\\/g, '/')}`
        : null,
      images: (details.MEDICINE_IMAGES || []).map(img => 
        `${baseUrl}/${img.replace(/\\\\/g, '/')}`
      )
    };
  } catch (error) {
    console.error(`Error fetching details for product ${product.MEDICINE_ID}:`, error.message);
    return null;
  }
}

async function fetchAllProducts() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const allProducts = [];
  
  for (const letter of alphabet) {
    console.log(`Fetching products for letter: ${letter}`);
    const products = await fetchProductsByLetter(letter);
    
    for (const product of products) {
      console.log(`Fetching details for: ${product.MEDICINE_NAME} (ID: ${product.MEDICINE_ID})`);
      const details = await fetchProductDetails(product);
      if (details) {
        allProducts.push(details);
      }
      await delay(500); // Be gentle on the server
    }
  }
  
  return allProducts;
}

async function saveAsTypeScript(products) {
  const tsContent = `// Auto-generated file. Do not edit manually.
// Last updated: ${new Date().toISOString()}

export interface ProductImage {
  url: string;
  caption?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  strength: string;
  uom: string;
  categoryId: string;
  insertFile: string | null;
  images: string[];
}

const products: Product[] = ${JSON.stringify(products, null, 2)};

export default products;`;

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(OUTPUT_TS, tsContent, 'utf-8');
  console.log(`\nSuccessfully saved ${products.length} products to ${OUTPUT_TS}`);
}

async function main() {
  try {
    console.log('Starting to fetch all products...');
    const products = await fetchAllProducts();
    await saveAsTypeScript(products);
    console.log('Process completed successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  fetchProductsByLetter,
  fetchProductDetails,
  fetchAllProducts,
  saveAsTypeScript,
};
