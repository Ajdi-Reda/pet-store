import { mysqlTable, int, decimal } from "drizzle-orm/mysql-core";
import { orders } from "./orders";
import { products } from "./products";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const orderItems = mysqlTable("order_items", {
  id: int("id").primaryKey().autoincrement(),
  orderId: int("order_id")
    .references(() => orders.id)
    .notNull(),
  productId: int("product_id")
    .references(() => products.id)
    .notNull(),
  quantity: int("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const insertOrderItemSchema = createInsertSchema(orderItems, {
  orderId: (schema) => schema.orderId.positive(),
  productId: (schema) => schema.productId.positive(),
  quantity: (schema) => schema.quantity.positive(),
  price: (schema) => schema.price,
});

export type InsertOrderItemSchema = z.infer<typeof insertOrderItemSchema>;
