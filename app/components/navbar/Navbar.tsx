"use client"
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faBagShopping, faCircleUser, faSearch, faCartShopping, faHeart, faShoppingCart, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { authorizedGetRequest } from '@/services/apiReqServices/authorizedRequest';
import Cookies from 'js-cookie';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { navbar, shop_cart } from '@/constants';

export const fetchUser = async () => {
  const response = await authorizedGetRequest("user");
  return response;
}

function Navbar() {
  const { cartItems, fetchCartItems } = useCartStore();
  const [user, setUser] = useState<user>();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const token = Cookies.get("token");
  const router = useRouter();

  const fetchData = async () => {
    const response = await fetchUser();
    if (!response.status) {
      setUser(response);
    } else {
      console.log("response", response.response.data.message);
    }
    setLoading(false); 
  };

  useEffect(() => {
    if (token) {
      fetchData();
      fetchCartItems(); // Ensure cart items are fetched when token is available
    } else {
      setLoading(false);
    }
  }, [token]);

  // Apply dark mode to the body based on the state
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    Cookies.remove("token"); 
    window.location.reload(); 
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', (!isDarkMode).toString());  // Persist theme in localStorage
  };

  // Check if dark mode was set previously in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  if (loading) {
    return null; // Return nothing during loading state
  }

  return (
    <nav className="flex h-20 dark:bg-gray-700 bg-gray-200 p-1 lg:p-10 items-center justify-between font-serif shadow-xl fixed w-full z-20">
      <div className="flex justify-center items-center sm:gap-10">
        <div className="text-black dark:text-white cursor-pointer justify-center flex items-center">
          <FontAwesomeIcon icon={faCircleHalfStroke} className='md:w-8 md:h-8 w-6 h-6 p-2' onClick={toggleDarkMode} />
        </div>
        <div className="text-purple-500 cursor-pointer">
          <FontAwesomeIcon icon={faBackward} className="w-7 h-7 md:inline-block hidden" onClick={()=>{router.back()}}/>
        </div>
        <Link href="/home">
          <div className="text-purple-500 flex items-center justify-center sm:gap-2 cursor-pointer">
            <FontAwesomeIcon icon={faBagShopping} className="sm:w-12 sm:h-12 w-8 h-8" />
            <div className="text-lg dark:text-white sm:text-3xl text-black font-serif font-semibold w-5">{shop_cart}</div>
          </div>
        </Link>
      </div>
      <div className="sm:w-2/4 w-1/4 flex justify-center items-center gap-4 relative ml-2">
        <div className="flex border rounded-lg border-gray-600 p-1 items-center justify-between bg-white px-4 xl:w-4/5 ">
          <input type="text" 
          placeholder="Enter product name to search.." 
          className="outline-none p-2 sm:w-11/12" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
          <FontAwesomeIcon icon={faSearch} className="w-8 h-8 ml-2 cursor-pointer" 
          onClick={() => router.push(`/products?name=${searchQuery}`)} />
        </div>

        <div className="relative text-purple-500 md:flex hidden justify-center items-center ">
          <Link href="/cart">
            <FontAwesomeIcon icon={faCartShopping} className="w-9 h-9 cursor-pointer" />
          </Link>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems.length} {/* Show the actual cart length */}
          </span>
        </div>
      </div>

      {/* Profile Icon with Dropdown */}
      {(token && user !== undefined && !user.message && !user.error) ? (
        <div className="relative flex justify-center items-center gap-x-2 group">
          <div className="text-purple-500 flex justify-center items-center cursor-pointer">
            <FontAwesomeIcon icon={faCircleUser} className="w-8 h-8" />
          </div>
          <div className="text-2xl text-black font-semibold sm:inline-block hidden cursor-pointer dark:text-white">{user?.name}</div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-6 w-48 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden group-hover:block">
            <ul className="p-2">
              {(user && user.role === "Admin") && (
                <li className="cursor-pointer text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-center">
                  <Link href="/dashboard/products">{navbar.DASHBOARD}</Link>
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
                <Link href="/cart">{navbar.CART}</Link>
              </li>
              <li className="cursor-pointer text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-center">
                <Link href="" className="underline"
                onClick={handleLogout}>{navbar.LOG_OUT}</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <Link href="/signin" className='bg-purple-300 px-4 py-1 rounded-lg'>Sign In</Link>
      )}
    </nav>
  );
}

export default Navbar;
