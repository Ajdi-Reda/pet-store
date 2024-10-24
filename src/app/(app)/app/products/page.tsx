import React from "react";
import ProductsPage from "@/features/products/components/productsPage";
import { db } from "@/db";

const Products = async () => {
  const products = await db.query.products.findMany();
  return (
    <div className="w-full">
      <ProductsPage products={products} />
    </div>
  );
};

export default Products;
