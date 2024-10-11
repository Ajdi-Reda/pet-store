// db/tables/order_items.ts
import {
  mysqlTable,
  serial,
  bigint,
  int,
  decimal,
} from "drizzle-orm/mysql-core";
import { orders } from "./orders";
import { products } from "./products";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const order_items = mysqlTable("order_items", {
  id: serial("id").primaryKey(),
  order_id: bigint({ mode: "number" })
    .references(() => orders.id)
    .notNull(),
  product_id: int("product_id")
    .references(() => products.id)
    .notNull(),
  quantity: int("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export const orderItemsRelations = relations(order_items, ({ one }) => ({
  order: one(orders, {
    fields: [order_items.order_id],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [order_items.product_id],
    references: [products.id],
  }),
}));

export const insertOrderItemSchema = createInsertSchema(order_items, {
  order_id: (schema) => schema.order_id.positive(),
  product_id: (schema) => schema.product_id.positive(),
  quantity: (schema) => schema.quantity.positive(),
  price: (schema) => schema.price,
});

export type InsertOrderItemSchema = z.infer<typeof insertOrderItemSchema>;
