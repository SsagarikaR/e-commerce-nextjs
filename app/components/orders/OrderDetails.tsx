import { faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons'
import { faStarHalf } from '@fortawesome/free-solid-svg-icons/faStarHalf'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

function OrderDetails({id}:{id:string}) {
  return (
    <div className='flex pt-24 w-screen font-serif'>
        <div className='w-4/5 flex m-auto gap-x-10 h-[450px]'>
            <div className='flex flex-col w-3/5 shadow-lg pt-20 px-20 gap-24'>
            <div className='flex justify-between  p-3'>
                <div className='flex flex-col text-xl gap-y-3 font-semibold text-gray-700'>
                    <div className=''>Fabbmate Fabbmate Trendy Sports</div>
                    <div>₹264</div>
                </div>
                <img src="https://outofoffice.la/cdn/shop/files/carl-ear-cuff.jpg?v=1728682621&width=800" className='w-44 shadow-md p-2'/>
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-x-4'>
                    <FontAwesomeIcon icon={faStarRegular} className='w-9'/>
                    <FontAwesomeIcon icon={faStarRegular} className='w-9'/>
                    <FontAwesomeIcon icon={faStarRegular} className='w-9'/>
                    <FontAwesomeIcon icon={faStarRegular} className='w-9'/>
                    <FontAwesomeIcon icon={faStarRegular} className='w-9'/>  
                </div>
                <Link href={`/review?pid=${id}`} className='bg-purple-300 p-4 py-2 rounded-lg hover:bg-purple-400'>Add Review</Link>
            </div>
            </div>
            <div className='flex flex-col gap-4 w-1/5'>
            <div className='flex flex-col shadow-lg p-4 gap-1'>
                <p className='font-semibold text-sm text-gray-600 border-b py-2'>Shipping Details</p>
                <div className='font-semibold'>
                    Sagarika Rout
                </div>
                <div>
                    Jagannath pur 139
                    Amrutamanohi Subdistrict, jagannath temple, muna shop,
                    Kendrapara District
                    Odisha - 754218
                </div>
                <div>
                    <p className='font-semibold'>Phone number:</p>
                    <p>7327864759</p>
                </div>
            </div>
            <div className='flex flex-col shadow-lg p-4 gap-2'>
                <p className='font-semibold text-sm text-gray-600 border-b py-2'>Price Details</p>
                <div className='flex justify-between'>
                    <p>Selling price</p>
                    <p>₹264</p>
                </div>
                <div className='flex justify-between'>
                    <p>Handling price</p>
                    <p>₹264</p>
                </div>
                <div className='flex justify-between'>
                    <p>Platform fee</p>
                    <p>₹264</p>
                </div>
                <div className='flex justify-between'>
                    <p>Delivery Charge</p>
                    <p>₹264</p>
                </div>
                <div className='flex justify-between font-semibold border-t pt-2'>
                    <p>Total Amount</p>
                    <p>₹274</p>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default OrderDetails
