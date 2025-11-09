import pool from "../pool.js";

async function patchStockQuantity (id, quantity) {
  await pool.query('UPDATE stocks SET quantity = $1 WHERE product_id = $2', [quantity, id]);
}

export default { patchStockQuantity };