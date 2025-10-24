import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./db/migrations",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST || "dev.mysql.gaodunwangxiao.com",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "gdtest",
    password: process.env.DB_PASSWORD || "gdmysql_221",
    database: process.env.DB_NAME || "gd_bot",
  },
});
