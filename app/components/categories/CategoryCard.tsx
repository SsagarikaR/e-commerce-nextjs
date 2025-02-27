import React from 'react'

function CategoryCard({cateoryID,categoryName,categoryThumbnail}:categories) {
  return (
    <div className=' flex flex-col justify-center items-center bg-transparent'>
      <img src={categoryThumbnail} className='w-[250px] h-[250px] xl:w-[300px] xl:h-[300px]  shadow-lg'/>
      <div className='font-serif text-xl font-semibold text-gray-600'>{categoryName}</div>
    </div>
  )
}

export default CategoryCard
