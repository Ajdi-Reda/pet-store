import { int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import { categories } from "./categories";
import { products } from "./products";

export const categoriesProducts = mysqlTable(
  "categories_products",
  {
    categoryId: int("category_id")
      .references(() => categories.id)
      .notNull(),
    productId: int("product_id")
      .references(() => products.id)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.categoryId, t.productId] }),
  })
);
