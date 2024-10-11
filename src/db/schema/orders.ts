// db/tables/orders.ts
import {
  mysqlTable,
  serial,
  int,
  decimal,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";
import { customers } from "./customers";
import { relations } from "drizzle-orm";
import { order_items } from "./order-items";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  customer_id: int("customer_id")
    .references(() => customers.id)
    .notNull(),
  order_date: timestamp("order_date").defaultNow(),
  total_amount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", {
    length: 10,
    enum: ["pending", "confirmed", "shipped", "delivered"],
  })
    .default("pending")
    .notNull(),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customer_id],
    references: [customers.id],
  }),
  orderItems: many(order_items),
}));

export const insertOrderSchema = createInsertSchema(orders, {
  customer_id: (schema) => schema.customer_id.positive(),
  total_amount: (schema) => schema.total_amount,
  status: (schema) => schema.status,
});

export type InsertOrderSchema = z.infer<typeof insertOrderSchema>;
