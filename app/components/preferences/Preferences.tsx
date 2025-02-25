import React from 'react'
import PreferenceCard from './PreferenceCard'

function Preferences() {
  return (
    <div className='px-20 py-10'>
      <div className='text-3xl font-serif font-semibold mb-2 text-gray-700'>Recommend for you..</div>
      <div className='grid lg:grid-cols-4 ms:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
      <PreferenceCard/>
      <PreferenceCard/>
      <PreferenceCard/>
      <PreferenceCard/>
      <PreferenceCard/>
      <PreferenceCard/>
      <PreferenceCard/>
      <PreferenceCard/>
      <PreferenceCard/>
      <PreferenceCard/>
      </div>
    </div>
  )
}

export default Preferences
