// prepare-data/src/services/drugintlSummaryService.js
const fs = require('fs');
const path = require('path');

// Get the directory of the current module
const currentDir = __dirname;

// Go up two levels from services directory to reach prepare-data
const baseDir = path.join(currentDir, '..', '..');
const inputPath = path.join(baseDir, 'data', 'drugInternationalProducts.ts');
const outputPath = path.join(baseDir, 'data', 'productSummary.ts');

try {
  // Read the source file
  const sourceContent = fs.readFileSync(inputPath, 'utf-8');

  // Extract the products array using regex
  const productsMatch = sourceContent.match(/const products: Product\[\] = (\[[\s\S]*?\]);/);
  if (!productsMatch || !productsMatch[1]) {
    console.error('Could not find products array in the source file');
    process.exit(1);
  }

  // Safely evaluate the products array
  const products = (new Function(`return ${productsMatch[1]};`))();

  // Create the summary
  const productSummary = products.map(product => ({
    id: product.id,
    name: product.name,
    strength: product.strength + product.uom,
    categoryId: product.categoryId
  }));

  // Generate the output content as TypeScript
  const outputContent = `// Auto-generated file. Do not edit manually.
// Last updated: ${new Date().toISOString()}

export const summary = ${JSON.stringify(productSummary, null, 2)};`;

  // Write to the output file
  fs.writeFileSync(outputPath, outputContent, 'utf-8');

  console.log(`Successfully generated product summary with ${productSummary.length} products at ${outputPath}`);
} catch (error) {
  console.error('Error generating product summary:', error);
  process.exit(1);
}