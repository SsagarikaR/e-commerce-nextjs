import Category from '@/app/components/categories/Category'
import Preferences from '@/app/components/preferences/Preferences'
import React from 'react'

function page() {
  return (
    <div className='min-w-full min-h-full'>
      <Category/>
      <Preferences/>
    </div>
  )
}

export default page
