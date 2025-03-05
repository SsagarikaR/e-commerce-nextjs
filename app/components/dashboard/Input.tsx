import React from 'react'

function Input({id,value,field,errors,onChange}:{
    id:string,
    value:string,
    field:string,
    errors:string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
   <div className="w-full flex pb-6 relative">
             <label className="text-xl w-2/5">{`Enter product ${field}`}</label>
             <input
               type="text"
               name={id}
               value={value}
               onChange={onChange}
               className="border border-gray-400 px-4 py-2 w-3/5"
             />
             {errors && <p className="text-red-500 text-sm absolute bottom-0 pl-[40%]">{errors}</p>}
           </div>
  )
}

export default Input
