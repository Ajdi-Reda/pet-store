// db/tables/reviews.ts
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
  customer_id: int("customer_id")
    .references(() => customers.id)
    .notNull(),
  product_id: int("product_id")
    .references(() => products.id)
    .notNull(),
  rating: int("rating").notNull(),
  comment: text("comment"),
  created_at: timestamp("created_at").defaultNow(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  customer: one(customers, {
    fields: [reviews.customer_id],
    references: [customers.id],
  }),
  product: one(products, {
    fields: [reviews.product_id],
    references: [products.id],
  }),
}));

export const insertReviewSchema = createInsertSchema(reviews, {
  customer_id: (schema) => schema.customer_id.positive(),
  product_id: (schema) => schema.product_id.positive(),
  rating: (schema) => schema.rating.min(1).max(5),
  comment: (schema) => schema.comment.max(1000).optional(),
});

export type InsertReviewSchema = z.infer<typeof insertReviewSchema>;
