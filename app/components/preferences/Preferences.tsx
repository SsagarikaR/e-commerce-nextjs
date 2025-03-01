"use client"
import React from 'react'
import useSWR from 'swr';
import PreferenceCard from './PreferenceCard'
import { authorizedGetRequest } from '@/services/reqServices/authorizedRequest';

const fetcher = async (url: string) => {
    try {
      const response = await authorizedGetRequest(url); // Use your custom axios request
      return response;
    } catch (error) {
      throw new Error("Failed to fetch reviews");
    }
};

function Preferences() {
  const { data: preferences, error } = useSWR<prefernce[], Error>("preferences", fetcher); // Fetch customers using the fetcher function
  console.log(preferences,"preference")
  if (error) return <div>Error loading customers</div>;
  if (!preferences) return <div>Loading...</div>;

  return (
    <div className='px-20 py-10'>
      <div className='text-3xl font-serif font-semibold mb-2 text-gray-700'>Recommend for you..</div>
      <div className='grid lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ms:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
     {
      preferences.map((item:prefernce)=>(
        <PreferenceCard key={item.preferenceID} item={item}/>
      ))
     }
      </div>
    </div>
  )
}

export default Preferences
