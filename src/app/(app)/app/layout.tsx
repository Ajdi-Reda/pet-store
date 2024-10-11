import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </div>
  );
};

export default Layout;
