"use client"
import React from 'react'
import OrderCard from './OrderCard'
import useSWR from 'swr';
import { authorizedGetRequest } from '@/services/apiReqServices/authorizedRequest';
import { orders } from '@/constants';

// Fetch product data using SWR
const fetcher = async (url: string) => {
  try {
    const response = await authorizedGetRequest(url);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch product");
  }
};


function Orders() {
  const { data: order, error } = useSWR<OrderData[],Error>(`orders`,fetcher);
  console.log(order,"order");
  return (
    <div className='flex flex-col md:p-20 w-screen pt-24 p-5 '>
      {
        (order && order.length>0)?
        (order.map((item)=>(
          <OrderCard key={item.orderID} item={item}/>
        )))
        :<div className='text-center text-3xl'>{orders.NO_ORDER}</div>
      }
    </div>
  )
}

export default Orders
