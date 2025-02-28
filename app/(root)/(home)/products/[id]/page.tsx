import ProductDetailPage from "@/app/components/products/ProductDetail";


async function page({params}:{params:{id:string}}) {
    const {id}=await params;
    
    return (
      <div>
       <ProductDetailPage id={id}/>
      </div>
    )
}

export default page
