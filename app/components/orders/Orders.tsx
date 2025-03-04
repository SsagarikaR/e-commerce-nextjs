"use client"
import React from 'react'
import OrderCard from './OrderCard'
import useSWR from 'swr';
import { orders } from '@/constants';
import { fetcher } from '@/lib/helpers/authorizedGetFetcher';




function Orders() {
  const { data: order, error } = useSWR<OrderData[],Error>(`orders`,fetcher);
  console.log(order,"order");

  if (!order) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='flex flex-col md:p-20 w-screen h-full pt-24 p-5 gap-3 overflow-auto'>
      {
        (order && order.length>0)?
        (order.map((item)=>(
          <OrderCard key={item.orderID} item={item}/>
        )))
        :<div className='text-center text-3xl dark:text-white'>{orders.NO_ORDER}</div>
      }
    </div>
  )
}

export default Orders
