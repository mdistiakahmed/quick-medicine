const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.squarepharma.com.bd';
const PRODUCTS_PAGE = `${BASE_URL}/products-by-tradename.php`;

/**
 * Fetches and parses product information from Square Pharma's products page
 * @returns {Promise<Array>} Array of product objects with name, chemical, productId, and imageUrl
 */
async function scrapeSquarePharmaProducts() {
    try {
        // Fetch the HTML content of the products page
        const { data } = await axios.get(PRODUCTS_PAGE);
        const $ = cheerio.load(data);
        const products = [];

        // Find all product thumbnails
        $('.pthumb-section .col-lg-4').each((_, element) => {
            const $product = $(element);
            
            // Extract product information
            const name = $product.find('h3').text().trim();
            const chemical = $product.find('h4').text().trim();
            
            // Extract product ID from the find more link
            const findMoreLink = $product.find('a.find-more').attr('href');
            const productId = findMoreLink ? new URLSearchParams(findMoreLink.split('?')[1]).get('pid') : null;
            
            // Extract image URL
            const imagePath = $product.find('img').attr('src');
            const imageUrl = imagePath ? `${BASE_URL}/${imagePath}` : null;

            if (name && chemical && productId) {
                products.push({
                    name,
                    chemical,
                    productId,
                    imageUrl,
                    source: 'Square Pharma',
                    sourceUrl: PRODUCTS_PAGE
                });
            }
        });

        console.log(`Successfully scraped ${products.length} products from Square Pharma`);
        return products;
    } catch (error) {
        console.error('Error scraping Square Pharma products:', error.message);
        throw error;
    }
}

module.exports = {
    scrapeSquarePharmaProducts
};