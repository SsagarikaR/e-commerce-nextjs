import React from 'react'

function AddProduct() {
  return (
    <div className='pt-10 w-full flex flex-col gap-4'>
      <div className='text-3xl font-semibold '>Add a new product</div>
      <form className='border-2 p-4 w-full flex flex-col gap-6'>
        <div className='w-full flex'>
            <label className='text-xl w-2/5'>Enter product name</label>
            <input type='text' className='border border-gray-400 px-4 py-2 w-3/5'/>
        </div>
        <div className='w-full flex'>
            <label className='text-xl w-2/5'>Enter product price</label>
            <input type='text' className='border border-gray-400 px-4 py-2 w-3/5'/>
        </div>
        <div className='w-full flex'>
            <label className='text-xl w-2/5'>Enter product brand</label>
            <input type='text' className='border border-gray-400 px-4 py-2 w-3/5'/>
        </div>
        <div className='w-full flex'>
            <label className='text-xl w-2/5'>Enter product category</label>
            <input type='text' className='border border-gray-400 px-4 py-2 w-3/5'/>
        </div>
        <div className='w-full flex'>
            <label className='text-xl w-2/5'>Enter product stock</label>
            <input type='text' className='border border-gray-400 px-4 py-2 w-3/5'/>
        </div>
        <div className='flex justify-end items-center'>
            <button className='bg-purple-400 px-10 py-2 text-lg font-semibold text-black rounded-md'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
