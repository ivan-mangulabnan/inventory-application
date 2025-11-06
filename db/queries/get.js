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

export default { getTotalProducts, getTotalStocks, getTotalCategories };