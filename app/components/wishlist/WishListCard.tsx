import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { authorizedDeleteRequest } from '@/services/apiReqServices/authorizedRequest'; // Ensure the correct API request service

interface WishListCardProps {
  item: wishlist;
  onDelete: (wishListID: number) => void; // Callback to update the parent component state
  onShowToast: (message: string, type: 'success' | 'error') => void; // Toast callback
}

function WishListCard({ item, onDelete, onShowToast }: WishListCardProps) {
  const handleDelete = async () => {
    try {
      // Call the API to delete the item from the wishlist
      const response = await authorizedDeleteRequest('wishlists', { wishListID: item.wishListID });
      if (response.status===200) {
        onDelete(item.wishListID); 
        onShowToast(response.message, 'success'); // Show success toast
      } else {
        onShowToast(response.message, 'error'); // Show error toast
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      onShowToast('An error occurred while deleting the item', 'error'); // Show error toast
    }
  };

  return (
    <div className='flex shadow-lg items-center justify-between font-serif text-sm md:text-md lg:text-lg font-semibold text-gray-700 p-4 dark:bg-gray-300'>
      <div className='flex justify-center items-center gap-x-2'>
        <img src={item.productThumbnail} className='w-28 shadow-md p-2 cursor-pointer' alt={item.productName} />
        <div className='flex flex-col'>
          <div className='flex justify-center items-center gap-1'>
            <div>{item.productName}</div>
            <img src={item.brandThumbnail} className='w-8 h-8 border shadow-md rounded-full' alt={item.brandName} />
          </div>
          <div>₹{item.productPrice}</div>
        </div>
      </div>

      <div className='flex flex-col gap-y-2'>
        <FontAwesomeIcon icon={faTrash} className='w-6 cursor-pointer' onClick={handleDelete} />
      </div>
    </div>
  );
}

export default WishListCard;
