import AddToCartBtn from './AddToCartBtn';
import WishlistIcon from './WishlistIcon';
import Link from 'next/link';


async function ProductCard({product}:{product:products}) {
  
  return (
    <div className=" flex flex-col gap-y-2 w-full shadow-2xl p-2 relative transition-transform duration-300 hover:scale-95 mx-auto  dark:bg-gray-300" >
        <WishlistIcon productID={product.productID}/>
        <div className='gap-y-2 flex flex-col' >
          <Link href={`/products/${product.productID}`}>
            <img src={product.productThumbnail} className='cursor-pointer w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:h-[400px] lg:w-[400px] shadow-md ' />
          </Link>
          <div className='flex items-center justify-center gap-x-2'>
          <Link href={`/products/${product.productID}`}>
            <div className="text-center text-md  font-semibold text-gray-700  cursor-pointer">{product.productName}</div>
          </Link>
            <img
            src={product.brandThumbnail}
            alt={product.brandName}
            className="h-8 w-8 rounded-full border shadow-md"
            />
          </div>          
          <div className='text-center ' >₹{product.productPrice}</div>
          <div className="flex items-center justify-center gap-2 mt-2">
        </div>
        </div>
       <AddToCartBtn productID={product.productID}/>
    </div>
  )
}

export default ProductCard