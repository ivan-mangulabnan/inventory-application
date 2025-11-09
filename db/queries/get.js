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

async function getProductsWithCategory () {
  const { rows } = await pool.query('SELECT p.*, c.name AS category FROM products AS p INNER JOIN categories AS c ON p.category_id = c.id');
  return rows;
}

async function getStocksWithProductName () {
  const { rows } = await pool.query('SELECT s.*, p.name FROM stocks AS s JOIN products AS p ON s.product_id = p.id');
  return rows;
}

async function getCategories () {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
}

async function getSpecificStock (id) {
  const { rows } = await pool.query('SELECT s.*, p.name FROM stocks AS s JOIN products AS p ON s.product_id = p.id WHERE s.product_id = $1', [id]);
  return rows[0];
}

export default { 
  getTotalProducts, 
  getTotalStocks, 
  getTotalCategories, 
  getProductsWithCategory,
  getStocksWithProductName,
  getCategories,
  getSpecificStock
};