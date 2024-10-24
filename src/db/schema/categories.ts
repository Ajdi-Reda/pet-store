import { z } from "zod";
import { mysqlTable, varchar, timestamp, int } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { InferSelectModel, relations } from "drizzle-orm";
import { products } from "./products";

export const categories = mysqlTable("categories", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const insertCategorySchema = createInsertSchema(categories, {
  id: (schema) => schema.id.positive(),
  name: (schema) => schema.name.min(1).max(100),
});

export type InsertCategorySchema = z.infer<typeof insertCategorySchema>;
export type SelectCategory = InferSelectModel<typeof categories>;
