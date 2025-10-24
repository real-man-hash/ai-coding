import { mysqlTable, int, varchar, text, datetime, float, json } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  emailVerified: datetime("email_verified"),
  image: varchar("image", { length: 500 }),
  studyStyle: json("study_style"),
  interestTags: json("interest_tags"),
  embeddingVector: json("embedding_vector"),
  // Additional fields for matching functionality
  learningPatterns: json("learning_patterns"),
  availability: json("availability"),
  experienceLevel: varchar("experience_level", { length: 50 }),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const learningSessions = mysqlTable("learning_sessions", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  content: text("content").notNull(),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const blindSpots = mysqlTable("blind_spots", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  topic: varchar("topic", { length: 255 }).notNull(),
  confidence: float("confidence").notNull(),
  aiAnalysis: json("ai_analysis"),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const flashcards = mysqlTable("flashcards", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  relatedTopic: varchar("related_topic", { length: 255 }).notNull(),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const buddyMatches = mysqlTable("buddy_matches", {
  id: int("id").primaryKey().autoincrement(),
  userId1: int("user_id1").notNull(),
  userId2: int("user_id2").notNull(),
  compatibilityScore: float("compatibility_score").notNull(),
  commonTopics: json("common_topics"),
  suggestedActivities: json("suggested_activities"),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, accepted, rejected, active
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

// NextAuth.js required tables
export const accounts = mysqlTable("accounts", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: int("expires_at"),
  token_type: varchar("token_type", { length: 255 }),
  scope: varchar("scope", { length: 255 }),
  id_token: text("id_token"),
  session_state: varchar("session_state", { length: 255 }),
});

export const sessions = mysqlTable("sessions", {
  id: int("id").primaryKey().autoincrement(),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  userId: int("user_id").notNull(),
  expires: datetime("expires").notNull(),
});

export const verificationTokens = mysqlTable("verification_tokens", {
  identifier: varchar("identifier", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  expires: datetime("expires").notNull(),
});
