import pool from '../pool.js';

async function getTotalProducts () {
  const { rowCount } = await pool.query('SELECT * FROM products');
  return rowCount;
}

async function getTotalStocks () {
  const { rowCount } = await pool.query('SELECT * FROM stocks');
  return rowCount;
}

async function getTotalCategories () {
  const { rowCount } = await pool.query('SELECT * FROM categories');
  return rowCount;
}

async function getProductsWithCategory (search) {
  if (search) {
    const { rows } = await pool.query('SELECT p.*, c.name AS category FROM products AS p INNER JOIN categories AS c ON p.category_id = c.id WHERE p.name ILIKE $1', [`%${search}%`]);
    return rows;
  }

  const { rows } = await pool.query('SELECT p.*, c.name AS category FROM products AS p INNER JOIN categories AS c ON p.category_id = c.id');
  return rows;
}

async function getStocksWithProductName () {
  const { rows } = await pool.query('SELECT s.*, p.name FROM stocks AS s JOIN products AS p ON s.product_id = p.id');
  return rows;
}

async function getCategories (search) {
  if (search) {
    const { rows } = await pool.query('SELECT * FROM categories WHERE name ILIKE $1', [`%${search}%`]);
    return rows;
  }

  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
}

async function getSpecificStock (id) {
  const { rows } = await pool.query('SELECT s.*, p.name FROM stocks AS s JOIN products AS p ON s.product_id = p.id WHERE s.product_id = $1', [id]);
  return rows[0];
}

async function getSpecificProductWithCategory (id) {
  const [ productResult, categoriesResult ] = await Promise.all([
    pool.query('SELECT p.*, c.name AS category, c.id AS category_id FROM products AS p INNER JOIN categories AS c ON p.category_id = c.id WHERE p.id = $1', [id]),
    pool.query('SELECT * FROM categories')
  ]);

  return { product: productResult.rows[0], categories: categoriesResult.rows };
}

async function getSpecificCategory (id) {
  const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return rows[0];
}

async function getProductsNotInStock (search) {
  if (search) {
    const { rows } = await pool.query('SELECT p.* FROM products AS p LEFT JOIN stocks AS s ON p.id = s.product_id WHERE s.product_id IS NULL AND p.name ILIKE $1', [`${search}%`]);
    return rows;
  } 

  const { rows } = await pool.query('SELECT p.* FROM products AS p LEFT JOIN stocks AS s ON p.id = s.product_id WHERE s.product_id IS NULL;');
  return rows;
}

export default { 
  getTotalProducts, 
  getTotalStocks, 
  getTotalCategories, 
  getProductsWithCategory,
  getStocksWithProductName,
  getCategories,
  getSpecificStock,
  getSpecificProductWithCategory,
  getSpecificCategory,
  getProductsNotInStock
};