import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

function AdminSidebar() {
  return (
    <div className="md:flex w-[250px] hidden flex-col font-serif  p-2 items-center text-xl font-semibold text-gray-700 h-screen shadow-2xl gap-8 justify-between">
    <div>
  <div className="flex  items-center gap-2 pb-10 pt-2">
    <Link href='/home'>
      <div className='text-purple-500 '><FontAwesomeIcon icon={faBagShopping} className="sm:w-9 w-6" /></div>
    </Link>
    <div className="text-lg sm:text-3xl text-black font-serif w-5">Shop Cart</div>
  </div>
  <div className="flex flex-col gap-6 w-full ">
      <ul className="flex flex-col gap-2 ">
        <li className="flex  gap-x-1 ">
          {`Products`}
        </li>
        <li className={`pl-10 cursor-pointer`} >
        <Link href="/dashboard/products">{`Producut List`}</Link>
        </li>
        <li className={`pl-10 cursor-pointer`} >
          <Link href="/dashboard/categories">{`Category List`}</Link>
        </li>
      </ul>
      <div className={`flex gap-1   cursor-pointer`} >
        <Link href="/dashboard/brands">{`Brands`}</Link>
      </div>
      <div className={`flex gap-1 cursor-pointer`} >
        <Link href="/dashboard/customers">{`customers`}</Link>
      </div>

  </div>
  </div>
  <div className="pb-10 text-2xl text-purple-500 cursor-pointer  underline" >{'Log Out'}</div>
  </div>
  )
}

export default AdminSidebar
