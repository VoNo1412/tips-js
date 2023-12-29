const { db } = require('../configs/db.config');

// Define the 'categories' table structure
const categoriesTable = `
  CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
  );
`;

// Create the 'categories' table if it doesn't exist
db.none(categoriesTable)
  .then(() => {
    console.log('Table "categories" created successfully');
  })
  .catch(error => {
    console.error('Error creating "categories" table:', error);
  });
  
module.exports = categories;
