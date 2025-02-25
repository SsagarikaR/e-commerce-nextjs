import React from 'react'
import WishListCard from './WishListCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

function Wishlist() {
  return (
    <div className=' flex p-0 sm:p-4 w-11/12 md:w-4/5 gap-x-10 mx-auto font-serif '>
      <div className='hidden md:flex shadow-lg p-4 w-1/5 h-28 justify-center items-center gap-x-4 '>
        <FontAwesomeIcon icon={faCircleUser} className='w-10 h-10'/>
        <div className='flex flex-col text-gray-600 '>
            <p>Hello,</p>
            <div className='text-xl'>Sagarika Rout</div>
        </div>
      </div>
      <div className='flex flex-col w-full sm:w-4/5 mx-auto'>
        <div className='text-lg '>My Wishlist(1)</div>
        <WishListCard/>
        <WishListCard/>
        <WishListCard/>
        <WishListCard/>
        <WishListCard/>
        <WishListCard/>
        <WishListCard/>
        <WishListCard/>
        <WishListCard/>
        <WishListCard/>
      </div>
    </div>
  )
}

export default Wishlist
