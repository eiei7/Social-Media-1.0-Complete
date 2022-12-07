import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

/* MySQL CONFIGURATION */
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USER = process.env.DB_USER;

const db = mysql.createConnection({
  host: "localhost",
  user: DB_USER,
  password: DB_PASSWORD,
  database: "mern",
});

db.connect();

export default db;
