"use client"; // This is a client-side component
import useSWR from 'swr'; // Import SWR
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";
import WishlistIcon from "./WishlistIcon";
import FetchReview from "../review/FetchReview";
import { authorizedPostRequest } from '@/services/apiReqServices/authorizedRequest';
import AddToCartBtn from './AddToCartBtn';

// Define the fetcher function
const fetcher = async (url: string) => {
  const response = await unAuthorizedGetRequest(url);
  return response;
};

function ProductDetailPage({ id }: { id: string }) {

  const addPrefernce=async()=>{
    const response=await authorizedPostRequest("preferences",{productID:id})
    console.log(response);
  }
  addPrefernce();

  const { data: product, error } = useSWR<products[],Error>(`/products?id=${id}`, fetcher); // Use SWR for fetching product data

  // Loading state
  if (!product) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  // Error handling
  if (error) {
    return <div>Error: {error.message}</div>; // Show error state if an error occurs
  }

  return (
    <div className="flex items-center justify-center ">
      {/* Render product details if product is available */}
      <div className="flex p-20 gap-10 flex-col lg:flex-row">
        <div className="mx-auto">
          <WishlistIcon productID={Number(id)} />
          <div className="">
            <img
              src={product[0].productThumbnail}
              className="shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] w-80 h-80 sm:w-100 sm:h-100 md:w-150 md:h-150 xl:w-[500px] xl:h-[500px] "
            />
          </div>
        </div>
        <div className=" w-80 sm:w-100 md:w-150 lg:w-150 xl:w-[450px] dark:text-white text-gray-700 gap-y-9 flex flex-col ">
          <div className="flex gap-y-4 flex-col ">
            <div className="flex gap-x-3">
              <div className="text-3xl font-semibold">{product[0].productName}</div>
              <img
                src={product[0].brandThumbnail}
                className="w-10 h-10 rounded-full border "
              />
            </div>
            <div className="text-2xl font-normal">₹{product[0].productPrice}</div>
            <div className=" border-b w-80 sm:w-100 md:w-150 lg:w-100 xl:w-[450px]"></div>
          </div>
          <div className="text-justify text-lg">{product[0].productDescription}</div>
          <div className="flex flex-col gap-y-2 pb-6">
            {/* <button className="bg-purple-300 hover:bg-purple-400 text-black p-3 text-xl font-semibold rounded-lg w-80 mx-auto">
              {`ADD TO CART`}
            </button> */}
            <AddToCartBtn productID={product[0].productID}/>
            {/* <div className="w-80 bg-orange-300 p-3 h-14 rounded-xl text-2xl font-semibold hover:bg-orange-400 flex justify-center items-center gap-x-2 cursor-pointer mx-auto">
              <button>Buy Now</button>
            </div> */}
          </div >
          <FetchReview id={product[0].productID} rating={product[0].rating}/>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
