# Zeabur 部署配置指南

## 问题描述
在 Zeabur 部署时出现 `Error: Table 'zeabur.users' doesn't exist` 错误，这是因为数据库表在应用启动时还没有被创建。

## 解决方案

### 1. 自动数据库初始化
项目已经配置了自动数据库初始化脚本，在应用启动前会自动创建所需的数据库表。

### 2. 环境变量配置
在 Zeabur 控制台中，确保设置以下环境变量：

#### 必需的环境变量：
```bash
# 数据库配置
MYSQL_HOST=your-mysql-host
MYSQL_PORT=3306
MYSQL_USERNAME=your-username
MYSQL_PASSWORD=your-password
MYSQL_DATABASE=your-database-name

# NextAuth 配置
NEXTAUTH_URL=https://your-app.zeabur.app
NEXTAUTH_SECRET=your-secret-key

# AI 服务配置（如果需要）
OPENAI_API_KEY=your-openai-api-key
```

### 3. 部署步骤

1. **连接 GitHub 仓库**
   - 在 Zeabur 控制台中，选择 "New Project"
   - 选择 "Deploy from GitHub"
   - 选择你的仓库

2. **配置服务**
   - 选择 "Next.js" 作为服务类型
   - 确保 Node.js 版本设置为 18 或更高

3. **设置环境变量**
   - 在服务设置中添加上述环境变量
   - 确保数据库连接信息正确

4. **数据库服务**
   - 如果使用 Zeabur 的 MySQL 服务，会自动提供数据库连接信息
   - 如果使用外部数据库，确保网络连接正常

### 4. 部署流程

部署时会发生以下步骤：

1. **安装依赖** (`npm install`)
2. **构建应用** (`npm run build`)
3. **初始化数据库** (`npm run db:init:prod`) - 自动运行
4. **启动应用** (`npm start`)

### 5. 验证部署

部署成功后，可以通过以下方式验证：

1. **检查应用日志**
   - 在 Zeabur 控制台中查看服务日志
   - 应该看到 "Database initialization completed successfully!" 消息

2. **检查数据库表**
   - 连接到数据库，验证所有表都已创建
   - 应该包含：users, accounts, sessions, verification_tokens, learning_sessions, blind_spots, flashcards, buddy_matches

### 6. 故障排除

如果仍然遇到问题：

1. **检查环境变量**
   - 确保所有数据库连接信息正确
   - 检查数据库服务是否正常运行

2. **检查网络连接**
   - 确保应用可以访问数据库
   - 检查防火墙设置

3. **查看详细日志**
   - 在 Zeabur 控制台中查看完整的部署日志
   - 查找数据库初始化相关的错误信息

4. **手动运行初始化**
   - 如果自动初始化失败，可以手动运行：
   ```bash
   npm run db:init:prod
   ```

### 7. 生产环境注意事项

- 确保 `NEXTAUTH_SECRET` 是一个强随机字符串
- 定期备份数据库
- 监控应用性能和数据库连接
- 考虑使用连接池来优化数据库性能

## 脚本说明

### `scripts/init-db.js`
- 自动读取迁移文件并执行 SQL 语句
- 处理表已存在的情况（忽略重复创建错误）
- 提供详细的执行日志
- 验证表创建结果

### `package.json` 脚本
- `db:init`: 开发环境数据库初始化
- `db:init:prod`: 生产环境数据库初始化
- `prestart`: 在应用启动前自动运行数据库初始化
