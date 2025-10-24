// Test Drizzle ORM
const { drizzle } = require("drizzle-orm/mysql2");
const mysql = require("mysql2/promise");

const testDrizzle = async () => {
  try {
    console.log('Testing Drizzle ORM...');
    
    const connection = mysql.createPool({
      host: "10.3.7.16",
      port: 3306,
      user: "gdtest",
      password: "gdmysql_221",
      database: "gd_bot",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      family: 4,
    });

    // Simple schema for testing
    const flashcards = {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      userId: { type: 'int', notNull: true },
      question: { type: 'text', notNull: true },
      answer: { type: 'text', notNull: true },
      relatedTopic: { type: 'varchar', length: 255, notNull: true },
      createdAt: { type: 'datetime', notNull: true, default: 'CURRENT_TIMESTAMP' }
    };

    const db = drizzle(connection, { mode: "default" });
    
    // Test insert
    console.log('Testing insert...');
    const result = await connection.execute(
      'INSERT INTO flashcards (user_id, question, answer, related_topic) VALUES (?, ?, ?, ?)',
      [1, 'Test question', 'Test answer', 'test']
    );
    console.log('Insert result:', result);
    
    // Test select
    console.log('Testing select...');
    const [rows] = await connection.execute('SELECT * FROM flashcards WHERE user_id = ?', [1]);
    console.log('Select result:', rows);
    
    await connection.end();
    console.log('Drizzle test completed');
  } catch (error) {
    console.error('Drizzle test error:', error);
  }
};

testDrizzle();
