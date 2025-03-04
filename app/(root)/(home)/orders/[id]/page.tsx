import OrderDetails from '@/app/components/orders/OrderDetails';
import React from 'react'

async function page({params}:{params:{id:string}}) {
    const {id}=await params;
  return (
    <div className='h-screen '>
      <OrderDetails id={id}/>
    </div>
  )
}

export default page