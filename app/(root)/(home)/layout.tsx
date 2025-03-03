import Navbar from '@/app/components/navbar/Navbar'
import React, { ReactNode } from 'react'
import Breadcrumb from '@/app/components/navbar/Breadcrumb'

function layout({children}:Readonly<{children:ReactNode}>) {
  return (
    <div className='flex h-screen min-w-screen flex-col dark:bg-gray-700 '>
      <Navbar/>
      <Breadcrumb/>
      {children}
    </div>
  )
}

export default layout
