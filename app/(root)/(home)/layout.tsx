import Navbar from "@/app/components/navbars/Navbar";
import React, { ReactNode } from "react";
import Breadcrumb from "@/app/components/navbars/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Shop cart",
    default: "Shop Cart",
  },
  description: "The e-commerce website Shop cart for jwellery shopping",
};

function layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-screen min-w-screen flex-col dark:bg-gray-700  bg-gradient-to-r from-gray-200 to-blue-200">
      <Navbar />
      <Breadcrumb />
      {children}
    </div>
  );
}

export default layout;
