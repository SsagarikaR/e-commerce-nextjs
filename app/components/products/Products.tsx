import Pagination from "../pagination/Pagination";
import ProductCard from "./productCard";
import { unAuthorizedGETRequest } from "@/services/reqServices/unAuthorizedRequest";

// Function to fetch paginated data
const fetchPaginatedProducts = async (category: string | null, page: number) => {
  const response = await unAuthorizedGETRequest(
    `products?categoryID=${category || ""}&page=${page}&limit=8`
  );
  // console.log(`products?categoryID=${category || ""}&page=${page}&limit=8`)
  // console.log(response)
  return response;
};

const Products = async({
  category,
  page
}: {
   category:string,
   page:number
}) => {
   // Fetch paginated data based on category and page
   const response= await fetchPaginatedProducts(category, page);
   let message;
   let products:products[];
   let totalPages;
   if(response.message){
    message=response.message
   }
   else{
    products=response
    console.log(products)
    totalPages=Math.ceil(products[0].totalCount/8);
   }
   const currentPage=page;
  return (
   
     <div className="flex w-screen justify-center items-center ">
      {message?(<div className="text-2xl">{message}</div>):(
     
      <div className="flex ">
        {products! && products.length > 0 ? (
          <div className="flex flex-col p-5 w-full">
            <div className="flex w-full">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10  place-items-center">
                {products.map((product) => (
                  <ProductCard product={product} key={product.productID} />
                ))}
              </div>
            </div>
            {/* Pagination Controls */}
            <Pagination category={category} currentPage={currentPage} totalPages={totalPages!} />
          </div>
        ) : (
          <div className="text-center w-400 mt-6 text-2xl font-medium text-red-800">
            No items found
          </div>
        )}
      </div>)}
    </div>
  );
};

export default Products;
