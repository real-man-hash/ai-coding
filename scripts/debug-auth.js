#!/usr/bin/env node

const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function debugAuth() {
  console.log('🔍 Debugging authentication...');
  
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

    // 检查用户表
    const [users] = await connection.execute('SELECT id, name, email, password FROM users LIMIT 5');
    console.log('👥 Users in database:', users.length);
    
    users.forEach(user => {
      console.log(`  - ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Has Password: ${!!user.password}`);
    });

    // 测试密码验证
    if (users.length > 0) {
      const testUser = users[0];
      if (testUser.password) {
        console.log('🔐 Testing password verification...');
        const testPassword = 'test123'; // 你可以修改这个测试密码
        const isValid = await bcrypt.compare(testPassword, testUser.password);
        console.log(`Password '${testPassword}' for user ${testUser.email}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
      }
    }

  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  debugAuth().catch(console.error);
}

module.exports = { debugAuth };
