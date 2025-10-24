import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || "10.3.7.16",
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USERNAME || "gdtest",
  password: process.env.MYSQL_PASSWORD || "gdmysql_221",
  database: process.env.MYSQL_DATABASE || "gd_bot",
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
