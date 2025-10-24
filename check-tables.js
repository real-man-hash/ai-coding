// Check if tables exist
const mysql = require('mysql2/promise');
require('dotenv').config();

const checkTables = async () => {
  try {
    console.log('Checking database tables...');
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "10.3.7.16",
      port: parseInt(process.env.DB_PORT || "3306"),
      user: process.env.DB_USER || "gdtest",
      password: process.env.DB_PASSWORD || "gdmysql_221",
      database: process.env.DB_NAME || "gd_bot",
    });

    // Check if flashcards table exists
    const [rows] = await connection.execute('SHOW TABLES LIKE "flashcards"');
    console.log('flashcards table exists:', rows.length > 0);
    
    if (rows.length === 0) {
      console.log('Creating flashcards table...');
      await connection.execute(`
        CREATE TABLE flashcards (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          related_topic VARCHAR(255) NOT NULL,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('flashcards table created');
    }
    
    // Check if users table exists
    const [usersRows] = await connection.execute('SHOW TABLES LIKE "users"');
    console.log('users table exists:', usersRows.length > 0);
    
    if (usersRows.length === 0) {
      console.log('Creating users table...');
      await connection.execute(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255),
          email_verified DATETIME,
          image VARCHAR(500),
          study_style JSON,
          interest_tags JSON,
          embedding_vector JSON,
          learning_patterns JSON,
          availability JSON,
          experience_level VARCHAR(50),
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log('users table created');
    }
    
    await connection.end();
    console.log('Database check completed');
  } catch (error) {
    console.error('Error:', error);
  }
};

checkTables();
