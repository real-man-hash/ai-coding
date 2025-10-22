import { Message } from "ai";
import { InferSelectModel } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  timestamp,
  json,
  char,
  boolean,
  int,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: char("id", { length: 36 }).primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export type User = InferSelectModel<typeof user>;

export const chat = mysqlTable("chat", {
  id: char("id", { length: 36 }).primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
  messages: json("messages").notNull(),
  userId: char("userId", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export type Chat = Omit<InferSelectModel<typeof chat>, "messages"> & {
  messages: Array<Message>;
};

export const reservation = mysqlTable("reservation", {
  id: char("id", { length: 36 }).primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
  details: json("details").notNull(),
  hasCompletedPayment: boolean("hasCompletedPayment").notNull().default(false),
  userId: char("userId", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export type Reservation = InferSelectModel<typeof reservation>;
