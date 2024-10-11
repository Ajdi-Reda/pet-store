// db/tables/customers.ts
import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  int,
} from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { users } from "./users";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { orders } from "./orders";
import { reviews } from "./reviews";

export const customers = mysqlTable("customers", {
  id: serial("id").primaryKey(),
  user_id: int("user_id")
    .references(() => users.id)
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: varchar("description", { length: 255 }),
  street_address: varchar("street_address", { length: 255 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  postal_code: varchar("postal_code", { length: 20 }),
  phone_number: varchar("phone_number", { length: 20 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const customersRelations = relations(customers, ({ one, many }) => ({
  orders: many(orders),
  reviews: many(reviews),
  users: one(users, {
    fields: [customers.user_id],
    references: [users.id],
  }),
}));

export const insertCustomerSchema = createInsertSchema(customers, {
  user_id: (schema) => schema.user_id.positive(),
  name: (schema) => schema.name.min(1).max(100),
  description: (schema) => schema.description.max(255).optional(),
  street_address: (schema) => schema.street_address.max(255).optional(),
  city: (schema) => schema.city.max(100).optional(),
  state: (schema) => schema.state.max(100).optional(),
  postal_code: (schema) => schema.postal_code.max(20).optional(),
  phone_number: (schema) => schema.phone_number.max(20).optional(),
});

export type InsertCustomerSchema = z.infer<typeof insertCustomerSchema>;
