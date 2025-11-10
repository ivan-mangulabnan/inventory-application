import pool from "../pool.js";

async function postProduct (name, price, categoryID) {
  await pool.query('INSERT INTO products (name, category_id, price) VALUES ($1, $2, $3)', [name, categoryID, price]);
}

async function postCategory (category) {
  await pool.query('INSERT INTO categories (name) VALUES ($1)', [category]);
}

async function postStock (id) {
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  if (!rows[0].id) return;
  await pool.query('INSERT INTO stocks (product_id, quantity) VALUES ($1, 0)', [id]);
}

export default { postProduct, postCategory, postStock };