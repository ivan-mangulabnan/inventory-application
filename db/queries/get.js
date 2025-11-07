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

export default { getTotalProducts, getTotalStocks, getTotalCategories, getProductsWithCategory };