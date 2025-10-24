import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./db/migrations",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.MYSQL_HOST || "dev.mysql.gaodunwangxiao.com",
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USERNAME || "gdtest",
    password: process.env.MYSQL_PASSWORD || "gdmysql_221",
    database: process.env.MYSQL_DATABASE || "gd_bot",
  },
});
