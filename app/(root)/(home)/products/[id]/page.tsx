import ProductDetailPage from "@/app/components/products/ProductDetail";


async function page({params}:{params:{id:string}}) {
    const {id}=await params;
    
    return (
      <div className="w-screen pt-20">
       <ProductDetailPage id={id}/>
      </div>
    )
}

export default page
