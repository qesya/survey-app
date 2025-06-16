import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: './.env' });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env file");
}

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
