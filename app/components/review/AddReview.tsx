import React from 'react'
import { faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AddReview({pid}:{pid:string}) {
  return (
    <div className='w-full pt-16 flex flex-col justify-center items-center font-serif gap-2'>
        <div className='w-11/12 flex items-center justify-between border px-10 py-4 text-gray-700 font-semibold'> 
            <div className='text-2xl '>Rating & Reviews</div>
            <div className='flex items-center justify-center gap-x-3'>
                <div className='text-lg'>
                    {`Cuffin ear ring`}
                </div>
                <img src="https://outofoffice.la/cdn/shop/files/carl-ear-cuff.jpg?v=1728682621&width=800" className='w-24 shadow-md p-2'/>
            </div>
        </div>
        <form className='w-11/12 gap-4 flex flex-col'>
            <div className='flex flex-col border p-4 gap-y-2 text-gray-600'>
              <div className='text-lg font-semibold'>Rate this product</div>
              <input type='number' className='border outline-none w-44 p-3'/>
            </div>
            <div className='border text-gray-600'>
              <div className='p-4 text-lg font-semibold'>Review this product</div>
              <div className='border'>
                  <div className='pl-4 '>Description</div>
                    <textarea rows={6} className='w-full outline-none' ></textarea>
              </div>
            </div>
            <div className='flex justify-end'>
              <div className=' bg-purple-300 px-4 py-2 rounded-md'>SUBMIT</div>
            </div>
        </form>
    </div>
  )
}

export default AddReview
