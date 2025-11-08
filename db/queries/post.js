import pool from "../pool.js";

async function postProduct (name, price, categoryID, quantity) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const result = await client.query('INSERT INTO products (name, category_id, price) VALUES ($1, $2, $3) RETURNING id', [name, categoryID, price]);
    const productID = result.rows[0].id;
    await client.query('INSERT INTO stocks (product_id, quantity) VALUES ($1, $2)', [productID, quantity]);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.log('Query rollbacked');
  } finally {
    client.release();
  }
}

export default { postProduct };