import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connection = mysql.createPool({
  host: process.env.DB_HOST || "10.3.7.16",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "gdtest",
  password: process.env.DB_PASSWORD || "gdmysql_221",
  database: process.env.DB_NAME || "gd_bot",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Force IPv4
  family: 4,
});

// Test connection
connection.getConnection()
  .then(conn => {
    console.log('Database connected successfully');
    conn.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

export const db = drizzle(connection, { schema, mode: "default" });
