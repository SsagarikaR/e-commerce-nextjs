import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function ProductList() {
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <img src="https://outofoffice.la/cdn/shop/files/carl-ear-cuff.jpg?v=1728682621&width=800" className='w-20 shadow-md p-2'/> 
                        {`cuff ear ring`} 
                    </td>
                    <td>2000</td>
                    <td>brand</td>
                    <td>category</td>
                    <td>stock</td>
                    <td className='flex items-center justify-center'>
                        <FontAwesomeIcon icon={faEdit} className='w-5'/>
                        <FontAwesomeIcon icon={faTrash} className='w-5'/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ProductList
