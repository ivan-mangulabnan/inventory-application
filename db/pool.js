import { Pool } from "pg";
export default new Pool({ connectionString: process.env.LOCAL_DB });