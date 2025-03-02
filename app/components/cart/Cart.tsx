"use client"
import React from 'react'
import CartCard from './CartCard'
import { useCartStore } from '@/store/cartStore';
import { useEffect ,useState} from 'react';


function Cart() {
      const { cartItems} = useCartStore();
      console.log(cartItems,"cart items");
       
  return (
    <div className='w-screen pt-24 '>
        {(cartItems && cartItems.length>0)?<div className='w-4/5 flex m-auto gap-x-6' >
            <div className='flex flex-col max-h-[800px] w-4/5 border'>
                <div className='flex flex-col max-h-[900px] overflow-auto'>
                {
                    cartItems.map((item)=>(
                        <CartCard key={item.cartItemID} item={item}/>
                    ))
                }
                </div>
                <div className='flex justify-end p-2 px-10 border'>
                    <button className='bg-purple-300 hover:bg-purple-400 p-6 py-3 rounded-md'>Place Order</button>
                </div>
            </div>
            <div className='w-1/5 border p-4 flex flex-col gap-3 h-64'>
                <div className='flex justify-between'>
                    <p>Total price({cartItems.length} item)</p>
                    <p>₹{cartItems[0].totalPrice}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Handling price</p>
                    <p>₹{cartItems[0].handlingPrice}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Platform fee</p>
                    <p>₹{cartItems[0].platformFee}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Delivery Charge</p>
                    <p>₹{cartItems[0].deliveryCharge}</p>
                </div>
                <div className='flex justify-between font-semibold border-t pt-2'>
                    <p>Total Amount</p>
                    <p>₹{cartItems[0].totalAmount}</p>
                </div>
            </div>
        </div>:<div className='text-2xl text-center font-semibold'>No items found</div>}
    </div>
  )
}

export default Cart
