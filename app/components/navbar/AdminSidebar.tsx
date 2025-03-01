"use client"
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { usePathname } from 'next/navigation'
import React from 'react'

function AdminSidebar() {
  const currentPath=usePathname();

  return (
    <div className="md:flex w-[250px] hidden flex-col font-serif p-2 items-center text-xl font-semibold text-gray-700 h-screen shadow-2xl gap-8 justify-between">
      <div>
        <div className="flex items-center gap-2 pb-10 pt-2">
          <Link href='/home'>
            <div className='text-purple-500 '><FontAwesomeIcon icon={faBagShopping} className="sm:w-9 w-6" /></div>
          </Link>
          <div className="text-lg sm:text-3xl text-black font-serif w-5">Shop Cart</div>
        </div>
        <div className="flex flex-col gap-6 w-full ">
          <ul className="flex flex-col gap-2 ">
            <li className="flex gap-x-1 ">
              {`Products`}
            </li>
            <li className={`pl-10 cursor-pointer`}>
              <Link
                href="/dashboard/products"
                className={`${currentPath === '/dashboard/products' ? 'bg-purple-300' : ''} hover:bg-purple-200 rounded-md px-4 py-1`}
              >
                Product List
              </Link>
            </li>
            <li className={`pl-10 cursor-pointer`}>
              <Link
                href="/dashboard/categories"
                className={`${currentPath === '/dashboard/categories' ? 'bg-purple-300 ' : ''} hover:bg-purple-200 rounded-md px-4 py-1`}
              >
                Category List
              </Link>
            </li>
          </ul>
          <div className={`flex gap-1 cursor-pointer`}>
            <Link
              href="/dashboard/brands"
              className={`${currentPath === '/dashboard/brands' ? 'bg-purple-200' : ''} hover:bg-purple-200 rounded-md px-4 py-1`}
            >
              Brands
            </Link>
          </div>
          <div className={`flex gap-1 cursor-pointer`}>
            <Link
              href="/dashboard/customers"
              className={`${currentPath === '/dashboard/customers' ? 'bg-purple-200' : ''} hover:bg-purple-200 rounded-md px-4 py-1`}
            >
              Customers
            </Link>
          </div>
        </div>
      </div>
      <div className="pb-10 text-2xl text-purple-500 cursor-pointer underline">
        {'Log Out'}
      </div>
    </div>
  )
}

export default AdminSidebar;
