import { mysqlTable, varchar, int, text, double } from "drizzle-orm/mysql-core";
import { categories } from "./categories";
import { InferSelectModel, relations } from "drizzle-orm";
import { reviews } from "./reviews";
import { orderItems } from "./order-items";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { timestamps } from "../columns/helpers";

export const products = mysqlTable("products", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  categoryId: int("category_id")
    .references(() => categories.id)
    .notNull(),
  price: double("price", { precision: 10, scale: 2 }).notNull(),
  stock: int("stock").default(0),
  imageUrl: varchar("image_url", { length: 255 }),
  ...timestamps,
});

export const productsRelations = relations(products, ({ many, one }) => ({
  orderItems: many(orderItems),
  reviews: many(reviews),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const productSchema = createInsertSchema(products, {
  name: (schema) =>
    schema.name
      .min(1, { message: "Product name cannot be empty." })
      .max(255, { message: "Product name cannot exceed 255 characters." }),
  description: (schema) =>
    schema.description
      .min(1, { message: "Product description cannot be empty." })
      .max(255, {
        message: "Product description cannot exceed 255 characters.",
      }),
  categoryId: z.coerce.number({ message: "Please select a valid category." }),
  price: z.coerce
    .number()
    .nonnegative({ message: "Price must be a positive value." }),
  stock: z.coerce
    .number()
    .nonnegative({ message: "Stock cannot be negative." }),
});

export type InsertProductSchema = z.infer<typeof productSchema>;
export type selectProduct = InferSelectModel<typeof products>;
