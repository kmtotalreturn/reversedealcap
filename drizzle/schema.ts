import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Lender submissions from the intake form
 */
export const lenderSubmissions = mysqlTable("lender_submissions", {
  id: int("id").autoincrement().primaryKey(),
  firmName: varchar("firm_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  dealSizeRanges: json("deal_size_ranges").$type<string[]>().notNull(),
  preferredIndustries: json("preferred_industries").$type<string[]>().notNull(),
  debtTypes: json("debt_types").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type LenderSubmission = typeof lenderSubmissions.$inferSelect;
export type InsertLenderSubmission = typeof lenderSubmissions.$inferInsert;

/**
 * Company submissions from the intake form
 */
export const companySubmissions = mysqlTable("company_submissions", {
  id: int("id").autoincrement().primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  industry: varchar("industry", { length: 255 }).notNull(),
  revenueRange: varchar("revenue_range", { length: 100 }).notNull(),
  interestReasons: json("interest_reasons").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CompanySubmission = typeof companySubmissions.$inferSelect;
export type InsertCompanySubmission = typeof companySubmissions.$inferInsert;
