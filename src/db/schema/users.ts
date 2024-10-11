// db/tables/users.ts
import { relations } from "drizzle-orm";
import { mysqlTable, serial, varchar, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { customers } from "./customers";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }) // Adding role column
    .notNull()
    .default("customer"), // Default role can be 'customer' or as per your requirement
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  orders: one(customers),
}));

export const insertUserSchema = createInsertSchema(users, {
  id: (schema) => schema.id.positive(),
  email: (schema) => schema.email.email(),
  password: (schema) => schema.password.min(6), // Assuming a minimum password length of 6
  role: (schema) => schema.role.min(1).max(50), // Ensure role is a string of max length 50
});

export type InsertUserSchema = z.infer<typeof insertUserSchema>;
