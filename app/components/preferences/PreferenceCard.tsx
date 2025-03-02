import React from 'react'

function PreferenceCard({item}:{item:prefernce}) {
  return (
    <div className='flex justify-center items-center flex-col text-gray-600 border p-4 gap-5'>
        <img src={item.productThumbnail} className='  shadow-xl'/>
        <div className='flex flex-col justify-center items-center'>
          <div className='text-md font-semibold'>{item.productName}</div>
          <div className='text-md font-semibold'>₹{item.productPrice}</div>
        </div>
    </div>
  )
}

export default PreferenceCard
