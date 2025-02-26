import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

function CustomerList() {
  return (
    <div className='w-full mt-10 text-lg text-gray-700 '>
                <table className='border w-full border-collapse'>
                    <thead >
                        <tr>
                            <th className='border-2 p-2'>Customer Name</th>
                            <th className='border-2 p-2'>Contact no.</th>
                            <th className='border-2 p-2'>Email</th>
                            <th className='border-2 p-2'>Add As Admin</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td className='border-2 p-2'>
                                <div className='flex space-x-2 items-center'>
                                    <img src="https://outofoffice.la/cdn/shop/files/carl-ear-cuff.jpg?v=1728682621&width=800" className='w-16 border-gray-200 border shadow-md p-2'/> 
                                    <div>{`cuff ear ring`} </div>
                                </div>
                            </td>
                            <td className='border-2 p-2'>
                                {`6371881727`}
                            </td>
                            <td className='border-2 p-2'>
                                {`sagarika@gmail.com`}
                            </td>
                            <td className='border-2 p-2'>
                                <div className="flex space-x-2 items-center justify-center">
                                    <div>
                                        <FontAwesomeIcon icon={faUserPlus} className='w-8 '/>
                                    </div>                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
  )
}

export default CustomerList
