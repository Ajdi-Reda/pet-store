"use server";

import { db } from "@/db";
import { products, productSchema } from "@/db/schema/products";
import { revalidatePath } from "next/cache";

export const addProduct = async (product: unknown) => {
  const validatedData = productSchema.safeParse(product);
  console.log(validatedData);
  if (!validatedData.success) {
    return {
      message: "Invalid product data",
    };
  }

  try {
    await db.insert(products).values(validatedData.data);
  } catch (error) {
    console.log(error);
    return {
      message: "Error adding product",
    };
  }

  revalidatePath("/app/products");
};
