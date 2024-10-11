import {
  mysqlTable,
  serial,
  varchar,
  int,
  decimal,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";
import { categories } from "./categories";
import { relations } from "drizzle-orm";
import { reviews } from "./reviews";
import { order_items } from "./order-items";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod"; // Ensure to import zod

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category_id: int("category_id")
    .references(() => categories.id)
    .notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: int("stock").default(0),
  image_url: varchar("image_url", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const productsRelations = relations(products, ({ many, one }) => ({
  orderItems: many(order_items),
  reviews: many(reviews),
  category: one(categories, {
    fields: [products.category_id],
    references: [categories.id],
  }),
}));

export const insertProductSchema = createInsertSchema(products, {
  name: (schema) => schema.name.min(1).max(255), // Ensure name is between 1 and 255 characters
  description: (schema) => schema.description.min(1).max(255), // Ensure description is between 1 and 255 characters
  price: (schema) => schema.price, // Coerce price to a number and ensure it's non-negative
  stock: (schema) => schema.stock.int().nonnegative(), // Ensure stock is a non-negative integer
});

// Optionally, you can define a type for the validated product data
export type InsertProductSchema = z.infer<typeof insertProductSchema>;
