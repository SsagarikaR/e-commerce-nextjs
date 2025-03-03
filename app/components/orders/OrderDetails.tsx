"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { authorizedGetRequest } from '@/services/apiReqServices/authorizedRequest';
import useSWR from 'swr';


// Fetch product data using SWR
const fetcher = async (url: string) => {
  try {
    const response = await authorizedGetRequest(url);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
};

function OrderDetails({id}:{id:string}) {
    const { data: order, error } = useSWR<OrderData[],Error>(`orders`,fetcher);
    const currentOrder= order?.filter(order => order.orderID === Number(id));
    console.log(currentOrder);
    console.log(currentOrder);
    if (!currentOrder) {
        return <div>Loading...</div>;
      }
      if (error) {
        return <div>Error: {error.message}</div>;
      }

  return (
    <div className='flex pt-36 w-screen font-serif'>
        <div className='lg:w-4/5 w-full flex md:flex-row flex-col gap-y-5 m-auto gap-x-10 h-[450px]'>
           
            <div className='flex flex-col w-full md:w-3/5 shadow-lg pt-20 px-20 gap-2  pb-10'>
            <div className='text-lg flex gap-2 font-semibold'>
                <div>Status: </div>
                <div className={`${currentOrder[0].status==="cancel"?"text-red-500":"text-green-500"}`}> {currentOrder[0].status}</div>
            </div>
                {currentOrder && (
                    currentOrder[0].items.map((item)=>(
                        <div key={item.productId}>
                        <div className='flex justify-between  p-3'>
                        <div className='flex flex-col text-xl gap-y-3 font-semibold text-gray-700'>
                            <div className=''>
                                <div>{item.productName}</div>
                            </div>
                            <div>₹{item.productPrice}</div>
                            <div>Quantity: {item.quantity}</div>
                        </div>
                        <img src={item.productThumbnail} className='w-44 shadow-md p-2'/>
                        </div>
                        <div className='flex justify-between'>
                        <Link href={`/review?pid=${id}`} className='bg-purple-300 p-4 py-2 rounded-lg hover:bg-purple-400'>Add Review</Link>
                        </div>
                        </div>
                    ))
               )}
            </div>
            <div className='flex flex-col gap-4 w-3/5 md:w-1/5 m-auto'>
            <div className='flex flex-col shadow-lg p-4 gap-1'>
                <p className='font-semibold text-sm text-gray-600 border-b py-2'>Shipping Details</p>
                <div className='font-semibold'>
                    {currentOrder[0].name}
                </div>
                <div>
                    {currentOrder[0].address}
                </div>
                <div>
                    <p className='font-semibold'>Phone number:</p>
                    <p>{currentOrder[0].contactNo}</p>
                </div>
            </div>
            <div className='flex flex-col shadow-lg p-4 gap-2'>
                <p className='font-semibold text-sm text-gray-600 border-b py-2'>Price Details</p>
                <div className='flex justify-between'>
                    <p>Selling price</p>
                    <p>₹{currentOrder[0].totalPrice}</p>
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
                    <p>₹{currentOrder[0].totalAmount}</p>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default OrderDetails