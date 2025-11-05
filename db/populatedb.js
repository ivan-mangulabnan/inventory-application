import { Client } from "pg";

const SQL = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255)
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id INTEGER REFERENCES categories(id) ON DELETE RESTRICT,
    name VARCHAR(255),
    price NUMERIC(10,2)
  );

  CREATE TABLE IF NOT EXISTS stocks (
    product_id INTEGER REFERENCES products(id) ON DELETE RESTRICT,
    quantity INTEGER
  );
`;

async function createTables () {
  console.log('seeding...');
  const client = new Client({ connectionString: process.argv[2] });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

createTables();