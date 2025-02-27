import React from 'react'
import CategoryCard from './CategoryCard'
import { unAuthorizedGETRequest } from '@/services/apiReqServices/unAuthorizedRequest';

const getAllCategories=async()=>{
  const categories=await unAuthorizedGETRequest("categories")
  return categories
}

async function Category() { 
  const categories:categories[]=await getAllCategories();
  console.log("Fetched categories:", categories); 

  return (
    <div className='pt-24 px-20'>
      <div className='text-3xl font-serif font-semibold mb-2 text-gray-700'>Categories</div>
      <div className='grid grid-cols-1 self-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 '>
        {
          categories.map((item,key)=>(
            <CategoryCard 
            key={key}
            cateoryID={item.cateoryID}
            categoryName={item.categoryName}
            categoryThumbnail={item.categoryThumbnail}/>
          ))
        }
      </div>
    </div>
  )
}

export default Category
