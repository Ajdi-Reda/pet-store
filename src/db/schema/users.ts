// db/tables/users.ts
import { relations } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  timestamp,
  mysqlEnum,
  int,
} from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { customers } from "./customers";
import type { z } from "zod";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: mysqlEnum(["ADMIN", "BASIC"]).default("BASIC").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  orders: one(customers),
}));

export const insertUserSchema = createInsertSchema(users, {
  id: (schema) => schema.id.positive(),
  email: (schema) => schema.email.email(),
  password: (schema) => schema.password.min(6),
  role: (schema) => schema.role,
});

export type InsertUserSchema = z.infer<typeof insertUserSchema>;
