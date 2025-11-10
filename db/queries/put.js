import pool from "../pool.js";

async function putEditedProduct (id, name, price, categoryID) {
  await pool.query('UPDATE products SET category_id = $1, name = $2, price = $3 WHERE id = $4', [categoryID, name, price, id]);
}

export default { putEditedProduct }