// Test database connection
const mysql = require('mysql2/promise');

const testDB = async () => {
  try {
    console.log('Testing database connection...');
    
    const connection = await mysql.createConnection({
      host: "10.3.7.16",
      port: 3306,
      user: "gdtest",
      password: "gdmysql_221",
      database: "gd_bot",
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
