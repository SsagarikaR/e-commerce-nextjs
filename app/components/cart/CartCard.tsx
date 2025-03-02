import { useCartStore } from "@/store/cartStore"

function CartCard({item}:{item:cartItem}) {
    const {removeItemFromCart,updateCartItemQuantity}=useCartStore();
  return (
    <div className='border flex justify-between items-center px-10 py-5'>
        <div className='flex  justify-center items-center gap-3 '>
            <img src={item.productThumbnail} className='w-36 shadow-md p-2'/>
            <div>
                <div>{item.productName}</div>
                <div>₹{item.productPrice}</div>
            </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
            <div className="flex items-center gap-2 ">
                {item.quantity!==1&&<button className="px-2 py-1 bg-gray-300 rounded"
                onClick={()=>{
                    updateCartItemQuantity(item.cartItemID,item.quantity-1)
                }}>-</button>}
                <p className="text-lg">{ item.quantity}</p>
                <button className="px-2 py-1 bg-gray-300 rounded"
                onClick={()=>{
                    updateCartItemQuantity(item.cartItemID,item.quantity+1)
                }}>+</button>
            </div>
            <div>
                <button className="mt-2 px-6 py-2 bg-red-500 hover:bg-red-400 text-white rounded"
                 onClick={()=>{
                    removeItemFromCart(item.cartItemID)
                 }}>Remove</button>
            </div>       
        </div>
    </div>
  )
}

export default CartCard
