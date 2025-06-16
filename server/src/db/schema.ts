import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const responses = sqliteTable("responses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  answers: text("answers", { mode: "json" }).notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export type SurveyAnswers = {
  name: string;
  feedback?: string;
  referral?: string;
  rating?: number;
  primary_reason?: string;
};
