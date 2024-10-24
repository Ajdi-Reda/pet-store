import { cn } from "@/lib/utils";
import React from "react";

type H1Props = {
  className?: string;
  children: string;
};

const H1 = ({ className, children }: H1Props) => {
  return (
    <h1 className={cn("text-xl md:text-3xl mb-4", className)}>{children}</h1>
  );
};

export default H1;
