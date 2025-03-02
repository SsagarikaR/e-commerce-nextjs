import Category from "@/app/components/categories/Category";
import { Metadata } from "next";



// Metadata for the page
export const metadata: Metadata = {
  title: 'Categories page',
  description: 'Categories of the application'
};

// Page component
const Page = async() => {
  

  return (
    <div className='min-w-full min-h-full pt-10'>
      <Category /> 
    </div>
  );
};

export default Page;
