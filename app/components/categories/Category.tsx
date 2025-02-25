import React from 'react'
import CategoryCard from './CategoryCard'

function Category() {
  return (
    <div className='pt-24 px-20'>
      <div className='text-3xl font-serif font-semibold mb-2 text-gray-700'>Categories</div>
      <div className='grid grid-cols-1 self-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 '>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
        <CategoryCard/>
      </div>
    </div>
  )
}

export default Category
