import Link from 'next/link'
import React from 'react'

function OrderCard() {
  return (
    <Link href="/orders/1">
    <div className='flex shadow-lg w-full lg:w-4/5 xl:w-3/5 m-auto items-center justify-between px-8 py-4 font-serif text-sm md:text-md lg:text-lg font-semibold text-gray-700 '>
      <div className='flex justify-center items-center gap-x-2'>
        <img src="https://outofoffice.la/cdn/shop/files/carl-ear-cuff.jpg?v=1728682621&width=800" className='w-28 shadow-md p-2'/>
        <div className='flex flex-col'>Cuff Ear Ring</div>
      </div>
      <div>₹500</div>
      <div className='  flex flex-col gap-y-2'>
          <div className='flex  items-center gap-x-2'>
              <div className='w-4 h-4 bg-orange-500 rounded-full'></div>
              <div>Pendning</div>
          </div>
          <div>Your order will be delivered with in a week</div>
      </div>
    </div>
    </Link>
  )
}

export default OrderCard
