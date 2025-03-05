import { product } from "@/constants";
import Pagination from "../pagination/Pagination";
import ProductCard from "./ProductCard";
import { unAuthorizedGetRequest } from "@/services/apiReqServices/unAuthorizedRequest";

const fetchPaginatedProducts = async (category: string | null, name: string | null, page: number) => {
  // Construct query parameters dynamically based on availability of `category` and `name`
  const queryParams = new URLSearchParams();
  if (category) queryParams.append("categoryID", category);
  if (name) queryParams.append("name", name);
  queryParams.append("page", String(page));
  queryParams.append("limit", "8");

  const response = await unAuthorizedGetRequest(`products?${queryParams.toString()}`);

  console.log(`products?${queryParams.toString()}`);
  console.log(response, "product");
  return response;
};


const Products = async({
  category,
  page,
  name
}: {
   category:string,
   page:number,
   name:string
}) => {
   // Fetch paginated data based on category and page
   const response= await fetchPaginatedProducts(category,name, page);
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
   
     <div className="flex w-screen justify-center items-center dark:text-white dark:bg-gray-700">
      {message?(<div className="text-2xl">{message}</div>):(
     
      <div className="flex text-black">
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
          <div className="text-2xl text-center font-semibold  ">
            {product.NO_PRODUCT}
          </div>
        )}
      </div>)}
    </div>
  );
};

export default Products;
