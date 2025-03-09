import { Pool } from "pg";

// PostgreSQL connection
const pool = new Pool({
  user: "strapi_user",
  host: "localhost",
  database: "strapi_db",
  password: "root",
  port: 5432, // Default PostgreSQL port
});

export default pool;
