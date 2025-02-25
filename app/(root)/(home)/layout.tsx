import Navbar from '@/app/components/navbar/Navbar'
import React, { ReactNode } from 'react'

function layout({children}:Readonly<{children:ReactNode}>) {
  return (
    <div className='flex h-screen min-w-screen '>
      <Navbar/>
      {children}
    </div>
  )
}

export default layout
