import pool from "../pool.js";

async function deleteProduct (id) {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
}

export default { deleteProduct };