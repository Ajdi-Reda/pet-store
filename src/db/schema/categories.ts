import { z } from "zod";
import { mysqlTable, serial, varchar, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { products } from "./products";

export const categories = mysqlTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const insertCategorySchema = createInsertSchema(categories, {
  id: (schema) => schema.id.positive(),
  name: (schema) => schema.name.min(1).max(100),
});

export type InsertCategorySchema = z.infer<typeof insertCategorySchema>;
