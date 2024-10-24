import { CategoryContext } from "@/contexts/category-context-provider";
import { useContext } from "react";

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("usePetContext must be used within a PetContextProvider");
  }

  return context;
};
