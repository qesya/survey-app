import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.js";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env file");
}

const client = createClient({ url: process.env.DATABASE_URL });

export const db = drizzle(client, { schema });
