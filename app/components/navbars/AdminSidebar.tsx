"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { admin_sidebar, shop_cart } from "@/constants";

function AdminSidebar({
  isNavOpen,
  setNavOpen,
}: {
  isNavOpen: boolean;
  setNavOpen: (data: boolean) => void;
}) {
  const currentPath = usePathname();

  return (
    <>
      {!isNavOpen ? (
        <div
          className="fixed top-7 md:hidden cursor-pointer z-20 "
          onClick={() => {
            setNavOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} className="w-8 h-8 " />
        </div>
      ) : (
        <div
          className="fixed top-1 md:hidden cursor-pointer z-20 left-52"
          onClick={() => {
            setNavOpen(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} className="w-8 h-8 " />
        </div>
      )}
      <div
        className={`${isNavOpen ? "flex fixed" : "hidden"} md:flex  w-[250px]  flex-col font-serif p-2 items-center text-xl font-semibold text-gray-700 h-screen shadow-2xl gap-8 justify-between bg-gradient-to-r from-gray-200 to-blue-100 z-10`}
      >
        <div>
          <div className="flex items-center gap-2 pb-10 pt-2">
            <Link href="/home">
              <div className="text-blue-500 ">
                <FontAwesomeIcon icon={faBagShopping} className="w-9 h-9 " />
              </div>
            </Link>
            <div className="text-2xl sm:text-3xl text-black font-serif w-5">
              {shop_cart}
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full ">
            <ul className="flex flex-col gap-2 ">
              <li className="flex gap-x-1 ">{`Products`}</li>
              <li className={`pl-10 cursor-pointer`}>
                <Link
                  href="/dashboard/products"
                  className={`${currentPath === "/dashboard/products" ? "bg-blue-300" : ""} hover:bg-blue-200 rounded-md px-4 py-1`}
                >
                  {admin_sidebar.PRODUCT_LIST}
                </Link>
              </li>
              <li className={`pl-10 cursor-pointer`}>
                <Link
                  href="/dashboard/categories"
                  className={`${currentPath === "/dashboard/categories" ? "bg-blue-300 " : ""} hover:bg-blue-200 rounded-md px-4 py-1`}
                >
                  {admin_sidebar.CATGEOYR_LIST}
                </Link>
              </li>
            </ul>
            <div className={`flex gap-1 cursor-pointer`}>
              <Link
                href="/dashboard/brands"
                className={`${currentPath === "/dashboard/brands" ? "bg-blue-200" : ""} hover:bg-blue-200 rounded-md px-4 py-1`}
              >
                {admin_sidebar.BRANDS}
              </Link>
            </div>
            <div className={`flex gap-1 cursor-pointer`}>
              <Link
                href="/dashboard/customers"
                className={`${currentPath === "/dashboard/customers" ? "bg-blue-200" : ""} hover:bg-blue-200 rounded-md px-4 py-1`}
              >
                {admin_sidebar.Customers}
              </Link>
            </div>
          </div>
        </div>
        <div
          className="pb-10 text-2xl text-blue-500 cursor-pointer underline"
          onClick={() => {
            Cookies.remove("token");
            window.location.reload();
          }}
        >
          {admin_sidebar.LOG_OUT}
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
