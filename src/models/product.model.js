const { db } = require('../configs/db.config');
// Define the 'products' table structure
const productsTable = `
  CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    product_name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    category_id INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL
  );
`;

// Create the 'products' table if it doesn't exist
db.none(productsTable)
  .then(() => {
    console.log('Table "products" created successfully');
  })
  .catch(error => {
    console.error('Error creating "products" table:', error);
  });

module.exports = products;
