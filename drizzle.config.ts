import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({
  path: ".env.local",
});

if (!process.env.DATABASE_URL) {
  console.warn(process.env.DATABASE_URL, 'process.env.DATABASE_URL')
  throw new Error("DATABASE_URL is not defined in environment variables");
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./lib/drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  // Add this if you're using MySQL 8+ with caching_sha2_password
  // driver: 'mysql2',
});
