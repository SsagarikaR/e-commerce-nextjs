"use client";
import AdminSidebar from "@/app/components/navbars/AdminSidebar";
import React, { ReactNode, useState } from "react";

function Layout({ children }: { children: ReactNode }) {
  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <div
      className={`w-screen flex font-serif min-h-screen ${isNavOpen && "bg-gray-200"} bg-gradient-to-r from-gray-200 to-blue-200`}
    >
      <AdminSidebar isNavOpen={isNavOpen} setNavOpen={setNavOpen} />
      <div
        className={`md:w-[86%] w-full `}
        onClick={() => {
          setNavOpen(false);
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
