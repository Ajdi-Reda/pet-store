import {
  mysqlTable,
  int,
  decimal,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";
import { customers } from "./customers";
import { relations } from "drizzle-orm";
import { orderItems } from "./order-items";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const orders = mysqlTable("orders", {
  id: int("id").primaryKey().autoincrement(),
  customerId: int("customer_id")
    .references(() => customers.id)
    .notNull(),
  orderDate: timestamp("order_date").defaultNow(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", {
    length: 10,
    enum: ["pending", "confirmed", "shipped", "delivered"],
  })
    .default("pending")
    .notNull(),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  orderItems: many(orderItems),
}));

export const insertOrderSchema = createInsertSchema(orders, {
  customerId: (schema) => schema.customerId.positive(),
  totalAmount: (schema) => schema.totalAmount,
  status: (schema) => schema.status,
});

export type InsertOrderSchema = z.infer<typeof insertOrderSchema>;
