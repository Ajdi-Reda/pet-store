"use client";

import { SelectCategory } from "@/db/schema/categories";
import React, { createContext } from "react";

type TPetContext = {
  categories: SelectCategory[];
};

type TPetContextProps = {
  data: SelectCategory[];
  children: React.ReactNode;
};
export const CategoryContext = createContext<TPetContext | null>(null);

const CategoryContextProvider = ({ data, children }: TPetContextProps) => {
  return (
    <CategoryContext.Provider
      value={{
        categories: data,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
