
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as notWishList } from '@fortawesome/free-regular-svg-icons';
import { faHeart as wishList } from '@fortawesome/free-solid-svg-icons';
import { authorizedGETRequest } from '@/services/reqServices/authorizedRequest';


export const fetchWishList=async(productID:number)=>{
  const response=await authorizedGETRequest(`wishlists/${productID}`)
  console.log(response);
  return response
}

async function WishlistIcon({productID}:{productID:number}) {
  const response=await fetchWishList(productID);
  return (
    <div className='absolute m-2 cursor-pointer ' 
     >
      { response.message ?
      <FontAwesomeIcon icon={notWishList} className='w-8 h-8'/>
      :<FontAwesomeIcon icon={wishList} className='w-8 h-8'/>}
    </div>
  )
}

export default WishlistIcon
