import AdminSidebar from '@/app/components/navbar/AdminSidebar';
import React, { ReactNode } from 'react'

function layout({children}:{children:ReactNode}) {
  return (
    <div className='w-screen flex font-serif'>
      <AdminSidebar/>
      {children}
    </div>
  )
}

export default layout;
