import React from 'react'

function Input({field,id,type}:InputProps) {
  return (
    <div className={`relative mb-8 ${id === "password" ? "space-y-2" : ""}`}>
      <input
        className="w-[90%] p-3 bg-gray-200 border border-gray-400 rounded-lg text-gray-800 font-medium text-lg focus:outline-none"
        id={id}
        // value={value}
        // onChange={(e) => {
        //   setValue(e.target.value);
        //   checkError(e.target.value, id);
        // }}
        // type={type}
        placeholder={`Enter your ${field}`}
      />
      {/* {error && <div className="text-red-500 text-sm mt-1">{error}</div>} */}
    </div>
  )
}

export default Input
