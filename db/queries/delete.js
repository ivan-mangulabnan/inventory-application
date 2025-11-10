import pool from "../pool.js";

async function deleteProduct (id) {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
}

async function deleteStock (id) {
  await pool.query('DELETE FROM stocks WHERE product_id = $1', [id]);
}

async function deleteCategory (id) {
  await pool.query('DELETE FROM categories WHERE id = $1', [id]);
}

export default { deleteProduct, deleteStock, deleteCategory };