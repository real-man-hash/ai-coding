#!/usr/bin/env node

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  console.log('🚀 Starting database initialization...');
  
  // 从环境变量获取数据库配置
  const config = {
    host: process.env.MYSQL_HOST || process.env.DB_HOST,
    port: parseInt(process.env.MYSQL_PORT || process.env.DB_PORT || '3306'),
    user: process.env.MYSQL_USERNAME || process.env.DB_USER,
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME,
  };

  console.log('📋 Database config:', {
    host: config.host,
    port: config.port,
    user: config.user,
    database: config.database
  });

  let connection;
  
  try {
    // 创建数据库连接
    connection = await mysql.createConnection(config);
    console.log('✅ Database connected successfully');

    // 读取迁移文件
    const migrationPath = path.join(__dirname, '../db/migrations/0000_hard_thunderbird.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // 分割 SQL 语句（按 --> statement-breakpoint 分割）
    const statements = migrationSQL
      .split('--> statement-breakpoint')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    console.log(`📝 Found ${statements.length} SQL statements to execute`);

    // 执行每个 SQL 语句
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
        try {
          await connection.execute(statement);
          console.log(`✅ Statement ${i + 1} executed successfully`);
        } catch (error) {
          // 如果表已存在，忽略错误
          if (error.code === 'ER_TABLE_EXISTS_ERROR') {
            console.log(`⚠️  Table already exists, skipping statement ${i + 1}`);
          } else {
            console.error(`❌ Error executing statement ${i + 1}:`, error.message);
            throw error;
          }
        }
      }
    }

    console.log('🎉 Database initialization completed successfully!');
    
    // 验证表是否创建成功
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📊 Created tables:', tables.map(row => Object.values(row)[0]));

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  initializeDatabase().catch(console.error);
}

module.exports = { initializeDatabase };
