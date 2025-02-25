import { faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function WishListCard() {
  return (
    <div className='flex shadow-lg   items-center justify-between font-serif text-sm md:text-md lg:text-lg font-semibold text-gray-700 p-4'>
        <div className='flex justify-center items-center gap-x-2 '>
          <img src="https://outofoffice.la/cdn/shop/files/carl-ear-cuff.jpg?v=1728682621&width=800" className='w-28 shadow-md p-2 cursor-pointer'/>
          <div className='flex flex-col'>
            <div>Cuff Ear Ring</div>
            <div>₹500</div>
          </div>
        </div>
        
        <div className='  flex flex-col gap-y-2'>
           <FontAwesomeIcon icon={faTrash} className='w-6 cursor-pointer'/>
        </div>
        

    </div>
  )
}

export default WishListCard
