#!/usr/bin/env node

function checkConfig() {
  console.log('🔍 Checking NextAuth configuration...');
  
  const requiredEnvVars = [
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'MYSQL_HOST',
    'MYSQL_USERNAME',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE'
  ];
  
  console.log('\n📋 Environment Variables:');
  requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      // Hide sensitive values
      const displayValue = varName.includes('PASSWORD') || varName.includes('SECRET') 
        ? '*'.repeat(8) 
        : value;
      console.log(`✅ ${varName}: ${displayValue}`);
    } else {
      console.log(`❌ ${varName}: NOT SET`);
    }
  });
  
  console.log('\n🌐 NextAuth Configuration:');
  console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || 'NOT SET'}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'NOT SET'}`);
  
  // Check if NEXTAUTH_URL is properly configured
  const nextAuthUrl = process.env.NEXTAUTH_URL;
  if (nextAuthUrl) {
    try {
      const url = new URL(nextAuthUrl);
      console.log(`✅ NEXTAUTH_URL is valid: ${url.origin}`);
      
      // Check if it's using HTTPS in production
      if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') {
        console.log('⚠️  WARNING: NEXTAUTH_URL should use HTTPS in production');
      }
    } catch (error) {
      console.log('❌ NEXTAUTH_URL is invalid:', error.message);
    }
  } else {
    console.log('❌ NEXTAUTH_URL is not set - this will cause redirect issues');
  }
  
  console.log('\n🔧 Recommendations:');
  if (!process.env.NEXTAUTH_URL) {
    console.log('- Set NEXTAUTH_URL to your production domain (e.g., https://realman.gaodun.com)');
  }
  if (!process.env.NEXTAUTH_SECRET) {
    console.log('- Set NEXTAUTH_SECRET to a secure random string');
  }
  if (process.env.NODE_ENV === 'production' && process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.startsWith('https://')) {
    console.log('- Use HTTPS for NEXTAUTH_URL in production');
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  checkConfig();
}

module.exports = { checkConfig };
