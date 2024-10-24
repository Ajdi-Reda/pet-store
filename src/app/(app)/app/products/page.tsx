import React from "react";
import ProductsPage from "@/features/products/components/productsPage";
import { db } from "@/db";

const Products = async () => {
  const products = await db.query.products.findMany({
    with: {
      category: {
        columns: { name: true },
      },
    },
  });
  console.log(products);
  return (
    <div className="w-full">
      <ProductsPage products={products} />
    </div>
  );
};

export default Products;
