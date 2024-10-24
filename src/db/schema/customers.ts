// db/tables/customers.ts
import { mysqlTable, varchar, timestamp, int } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { users } from "./users";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { orders } from "./orders";
import { reviews } from "./reviews";

export const customers = mysqlTable("customers", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .references(() => users.id)
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: varchar("description", { length: 255 }),
  streetAddress: varchar("street_address", { length: 255 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  postalCode: varchar("postal_code", { length: 20 }),
  phoneNumber: varchar("phone_number", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const customersRelations = relations(customers, ({ one, many }) => ({
  orders: many(orders),
  reviews: many(reviews),
  users: one(users, {
    fields: [customers.userId],
    references: [users.id],
  }),
}));

export const insertCustomerSchema = createInsertSchema(customers, {
  userId: (schema) => schema.userId.positive(),
  name: (schema) => schema.name.min(1).max(100),
  description: (schema) => schema.description.max(255),
  streetAddress: (schema) => schema.streetAddress.max(255),
  city: (schema) => schema.city.max(100),
  state: (schema) => schema.state.max(100),
  postalCode: (schema) => schema.postalCode.max(20),
  phoneNumber: (schema) => schema.phoneNumber.max(20),
});

export type InsertCustomerSchema = z.infer<typeof insertCustomerSchema>;
