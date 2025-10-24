// Test database connection
const mysql = require('mysql2/promise');
require('dotenv').config();

const testDB = async () => {
  try {
    console.log('Testing database connection...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "10.3.7.16",
      port: parseInt(process.env.DB_PORT || "3306"),
      user: process.env.DB_USER || "gdtest",
      password: process.env.DB_PASSWORD || "gdmysql_221",
      database: process.env.DB_NAME || "gd_bot",
    });

    console.log('Database connected successfully');
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('Query result:', rows);
    
    await connection.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

testDB();
