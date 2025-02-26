import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function ProductList() {
  return (
    <div className='w-full mt-10 text-lg text-gray-700 '>
        <table className='border w-full border-collapse'>
            <thead >
                <tr>
                    <th className='border-2 p-2'>Product Name</th>
                    <th className='border-2 p-2'>Price</th>
                    <th className='border-2 p-2'>Brand</th>
                    <th className='border-2 p-2'>Category</th>
                    <th className='border-2 p-2'>Stock</th>
                    <th className='border-2 p-2'>Action</th>
                </tr>
            </thead>
            <tbody >
                <tr>
                    <td className='border-2 p-2'>
                        <div className='flex space-x-2 items-center justify-center'>
                            <img src="https://outofoffice.la/cdn/shop/files/carl-ear-cuff.jpg?v=1728682621&width=800" className='w-16 border-gray-200 border shadow-md p-2'/> 
                            <div>{`cuff ear ring`} </div>
                        </div>
                    </td>
                    <td className='border-2 p-2'>2000</td>
                    <td className='border-2 p-2'>brand</td>
                    <td className='border-2 p-2'>category</td>
                    <td className='border-2 p-2'>stock</td>
                    <td className='border-2 p-2'>
                        <div className="flex space-x-2">
                            <FontAwesomeIcon icon={faEdit} className='w-5'/>
                            <FontAwesomeIcon icon={faTrash} className='w-5'/>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ProductList
