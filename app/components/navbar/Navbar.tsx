"use client"
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faBagShopping, faCircleUser, faSearch, faCartShopping, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { authorizedGetRequest } from '@/services/reqServices/authorizedRequest';
import Cookies from 'js-cookie';

export const token=await Cookies.get("token");

export const fetchUser = async () => {
  const response = await authorizedGetRequest("user");
  console.log(response);
  return response;
}

function Navbar() {
  const [user, setUser] = useState<user>();
  const [loading, setLoading] = useState(true); // To handle initial load state

  const token = Cookies.get("token");

  const fetchData = async () => {
    const response = await fetchUser();
    setUser(response);
    setLoading(false); // Set loading to false after data is fetched
  }

  useEffect(() => {
    if (token) { // Only fetch data if token exists
      fetchData();
    } else {
      setLoading(false); // If no token, stop loading
    }
  }, [token]);

  if (loading) {
    // This will prevent hydration error by rendering an empty or loading state on the initial server render
    return null; 
  }

  return (
    <nav className="flex h-20 bg-gray-200 p-1 lg:p-10 items-center justify-between font-serif shadow-xl fixed w-full z-10">
      <div className="flex justify-center items-center sm:gap-10">
        <div className="text-purple-500 cursor-pointer">
          <FontAwesomeIcon icon={faBackward} className="w-7 h-7 md:inline-block hidden" />
        </div>
        <Link href="/home">
          <div className="text-purple-500 flex items-center justify-center sm:gap-2 cursor-pointer">
            <FontAwesomeIcon icon={faBagShopping} className="sm:w-12 sm:h-12 w-6 h-6" />
            <div className="text-lg sm:text-3xl text-black font-serif font-semibold w-5">Shop Cart</div>
          </div>
        </Link>
      </div>
      <div className="sm:w-2/4 w-1/4 flex justify-center items-center gap-4 relative ml-2">
        <div className="flex border rounded-lg border-gray-600 p-1 items-center justify-between bg-white px-4 xl:w-4/5 ">
          <input type="text" placeholder="Enter product name to search.." className="outline-none p-2 w-11/12" />
          <FontAwesomeIcon icon={faSearch} className="w-8 h-8 ml-2 cursor-pointer" />
        </div>

        <div className="relative text-purple-500 md:flex hidden justify-center items-center ">
          <Link href="/cart">
            <FontAwesomeIcon icon={faCartShopping} className="w-9 h-9 cursor-pointer" />
          </Link>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {0}
          </span>
        </div>
      </div>

      {/* Profile Icon with Dropdown */}
      {token ? (
        <div className="relative flex justify-center items-center gap-x-2 group">
          <div className="text-purple-500 flex justify-center items-center cursor-pointer">
            <FontAwesomeIcon icon={faCircleUser} className="w-8 h-8" />
          </div>
          <div className="text-2xl text-black font-semibold sm:inline-block hidden cursor-pointer">David</div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-6 w-48 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden group-hover:block">
            <ul className="p-2">
              {(user && user.role === "Admin") && (
                <li className="cursor-pointer text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-center">
                  <Link href="/dashboard/products">Dashboard</Link>
                </li>
              )}
              <li className="cursor-pointer text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-center">
                <Link href="/wishlist" className="flex gap-x-2 justify-center items-center">
                  <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                  {'WishList'}
                </Link>
              </li>
              <li className="cursor-pointer text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-center">
                <Link href="/orders" className="flex gap-x-2 ">{'Orders'}</Link>
              </li>
              <li className="cursor-pointer md:hidden text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-center">
                <Link href="/cart">Cart</Link>
              </li>
              <li className="cursor-pointer text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-center">
                <Link href="" className="underline">Log Out</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link href="/signin">Sign In</Link>
      )}
    </nav>
  );
}

export default Navbar;
