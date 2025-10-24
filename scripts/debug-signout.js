#!/usr/bin/env node

const mysql = require('mysql2/promise');

async function debugSignOut() {
  console.log('🔍 Debugging sign out process...');
  
  // 从环境变量获取数据库配置
  const config = {
    host: process.env.MYSQL_HOST || process.env.DB_HOST,
    port: parseInt(process.env.MYSQL_PORT || process.env.DB_PORT || '3306'),
    user: process.env.MYSQL_USERNAME || process.env.DB_USER,
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME,
  };

  let connection;
  
  try {
    // 创建数据库连接
    connection = await mysql.createConnection(config);
    console.log('✅ Database connected successfully');

    // 检查 sessions 表
    console.log('\n📊 Checking sessions table...');
    try {
      const [sessions] = await connection.execute('SELECT * FROM sessions LIMIT 5');
      console.log(`Found ${sessions.length} active sessions:`);
      sessions.forEach(session => {
        console.log(`  - Session Token: ${session.session_token.substring(0, 20)}...`);
        console.log(`    User ID: ${session.user_id}`);
        console.log(`    Expires: ${session.expires}`);
        console.log(`    Is Expired: ${new Date(session.expires) < new Date()}`);
        console.log('');
      });
    } catch (error) {
      console.log('❌ Sessions table not found or error:', error.message);
    }

    // 检查 NextAuth 配置
    console.log('\n🔧 NextAuth Configuration:');
    console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || 'NOT SET'}`);
    console.log(`NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET'}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV || 'NOT SET'}`);
    
    // 检查 Cookie 配置
    console.log('\n🍪 Cookie Configuration:');
    console.log(`useSecureCookies: ${process.env.NODE_ENV === 'production' ? 'true' : 'false'}`);
    console.log(`trustHost: ${process.env.NODE_ENV === 'production' ? 'true' : 'false'}`);

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
  debugSignOut().catch(console.error);
}

module.exports = { debugSignOut };
