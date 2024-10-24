import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { Toaster } from "@/components/ui/toaster";
import CategoryContextProvider from "@/contexts/category-context-provider";
import { db } from "@/db";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  const categories = await db.query.categories.findMany();
  return (
    <div className="w-full">
      <CategoryContextProvider data={categories}>
        <AdminPanelLayout>{children}</AdminPanelLayout>
      </CategoryContextProvider>
      <Toaster />
    </div>
  );
};

export default Layout;
