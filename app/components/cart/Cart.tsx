import React from 'react'
import CartCard from './CartCard'

function Cart() {
  return (
    <div className='w-screen pt-24 '>
        <div className='w-4/5 flex m-auto gap-x-6' >
            <div className='flex flex-col max-h-[800px] w-4/5 border'>
                <div className='flex flex-col max-h-[900px] overflow-auto'>
                <CartCard/>
                <CartCard/>
                <CartCard/>
                <CartCard/>
                <CartCard/>
                <CartCard/>
                <CartCard/>
                <CartCard/>
                <CartCard/>
                </div>
                <div className='flex justify-end p-2 px-10 border'>
                    <button className='bg-purple-300 hover:bg-purple-400 p-6 py-3 rounded-md'>Place Order</button>
                </div>
            </div>
            <div className='w-1/5 border p-4 flex flex-col gap-3 h-64'>
                <div className='flex justify-between'>
                    <p>Total price({1} item)</p>
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
  )
}

export default Cart
