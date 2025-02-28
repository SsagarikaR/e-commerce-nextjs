import { unAuthorizedGETRequest } from "@/services/reqServices/unAuthorizedRequest";
import WishlistIcon from "./WishlistIcon";

export const getProduct=async(id:string)=>{
    const product=await unAuthorizedGETRequest(`products?id=${id}`)
    return product
}

async function ProductDetailPage({id}:{id:string}) {
    const product:products[]=await getProduct(id);
    return (
            <div className="flex items-center justify-center ">
                {/* Render product details if product is available */}
                
                    <div className="flex p-20 gap-10 flex-col lg:flex-row ">
                        <div className="mx-auto">
                        <WishlistIcon productID={Number(id)}/>
                        <div className="">
                            <img
                                src={product[0].productThumbnail}
                                className="shadow-[0_0_15px_5px_rgba(0,0,0,0.3)] w-80 h-80 sm:w-100 sm:h-100 md:w-150  md:h-150 xl:w-150 xl:h-150 "
                            />
                        </div>
                        </div>
                        <div className=" w-80  sm:w-100  md:w-150 lg:w-150 xl:150 dark:text-white  text-gray-700 gap-y-9 flex flex-col  ">
                            <div className="flex gap-y-4 flex-col ">
                                <div className="flex gap-x-3">
                                    <div className="text-3xl font-semibold">{product[0].productName}</div>
                                    <img
                                        src={product[0].brandThumbnail}
                                        className="w-10 h-10 rounded-full border "
                                    />
                                </div>
                                <div className="text-2xl font-normal">₹{product[0].productPrice}</div>
                                {/* To create divider line */}
                                <div className=" border-b  w-80  sm:w-100 md:w-150 lg:w-100 xl:150"></div>
                            </div>
                            <div className="text-justify text-lg">{product[0].productDescription}</div>
                            <div className="flex flex-col gap-y-2">
                                <button
                                    className="bg-purple-300 hover:bg-purple-400 text-black p-3 text-xl font-semibold rounded-lg w-80 sm:w-100 mx-auto"
                                >
                                    {`ADD TO CART`}  {/* Button text from constant */}
                                </button>
                                <div className="w-80 sm:w-100 bg-orange-400   p-3  h-14 rounded-xl text-2xl font-semibold hover:bg-orange-500 flex justify-center items-center gap-x-2 cursor-pointer mx-auto">
                                    <button >Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                {/* Conditionally render CartModal when it is open */}
                
            </div>
       
    );
}

export default ProductDetailPage;  