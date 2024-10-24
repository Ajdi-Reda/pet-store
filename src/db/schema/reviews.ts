import {
  mysqlTable,
  serial,
  int,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";
import { products } from "./products";
import { relations } from "drizzle-orm";
import { customers } from "./customers";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const reviews = mysqlTable("reviews", {
  id: serial("id").primaryKey(),
  customerId: int("customer_id")
    .references(() => customers.id)
    .notNull(),
  productId: int("product_id")
    .references(() => products.id)
    .notNull(),
  rating: int("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  customer: one(customers, {
    fields: [reviews.customerId],
    references: [customers.id],
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

export const insertReviewSchema = createInsertSchema(reviews, {
  customerId: (schema) => schema.customerId.positive(),
  productId: (schema) => schema.productId.positive(),
  rating: (schema) => schema.rating.min(1).max(5),
  comment: (schema) => schema.comment.max(1000).optional(),
});

export type InsertReviewSchema = z.infer<typeof insertReviewSchema>;
