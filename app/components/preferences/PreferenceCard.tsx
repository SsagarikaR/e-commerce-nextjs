import React from 'react'

function PreferenceCard({item}:{item:prefernce}) {
  return (
    <div className='flex justify-center items-center flex-col text-gray-600 '>
        <img src={item.productThumbnail} className='  shadow-xl'/>
        <div className='text-lg font-semibold'>{item.productName}</div>
        <div className='text-lg font-semibold'>₹{item.productPrice}</div>
    </div>
  )
}

export default PreferenceCard
