"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./product-form";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

type ProdutButtonsProps = {
  children: React.ReactNode;
  actionType: "add" | "edit" | "delete";
  onClick?: () => void;
};

const ProductButtons = ({
  children,
  actionType,
  onClick,
}: ProdutButtonsProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  if (actionType === "delete") {
    return (
      <Button variant="destructive" onClick={onClick}>
        {children}
      </Button>
    );
  }
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button>{children}</Button>
        ) : (
          <Button variant="outline">{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <ProductForm
            action={actionType}
            onFormSubmission={() => setOpenDialog(false)}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductButtons;
