import React from 'react'

function CartCard() {
  return (
    <div className='border flex justify-between items-center px-10 py-5'>
        <div className='flex  justify-center items-center gap-3 '>
            <img src="https://outofoffice.la/cdn/shop/files/carl-ear-cuff.jpg?v=1728682621&width=800" className='w-36 shadow-md p-2'/>
            <div>
                <div>Cuff ear ring</div>
                <div>200</div>
            </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
            <div className="flex items-center gap-2 ">
                <button className="px-2 py-1 bg-gray-300 rounded">-</button>
                <p className="text-lg">{ 1}</p>
                <button className="px-2 py-1 bg-gray-300 rounded">+</button>
            </div>
            <div>
                <button className="mt-2 px-6 py-2 bg-red-500 hover:bg-red-400 text-white rounded">Remove</button>
            </div>       
        </div>
    </div>
  )
}

export default CartCard
