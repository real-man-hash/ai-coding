import { config } from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";

config({
  path: ".env.local",
});

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  // Parse the database URL
  const url = new URL(process.env.DATABASE_URL);
  const connection = await mysql.createConnection({
    host: url.hostname,
    port: parseInt(url.port) || 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.replace(/^\//, ''), // Remove leading slash
    multipleStatements: true,
  });

  const db = drizzle(connection);

  console.log("⏳ Running migrations...");

  try {
    const start = Date.now();
    await migrate(db, { migrationsFolder: "./lib/drizzle" });
    const end = Date.now();
    console.log("✅ Migrations completed in", end - start, "ms");
  } catch (error) {
    console.error("❌ Migration failed");
    console.error(error);
    process.exit(1);
  } finally {
    await connection.end();
    process.exit(0);
  }
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
