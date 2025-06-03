"use client"
import React from 'react'

const TextInput = ({label,name,errors,register,isRequired=true,type="text",className="sm:col-span-2",defaultValue=""}) => {
  return (
    <div className={className}>
      <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2'>
        {label}
      </label>
      <div className="mt-2">
        <input defaultValue={defaultValue} {...register(`${name}`,{required:isRequired})} type={type} id={name} autoComplete={name} className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-inset focus:ring-lime-900 dark:focus:ring-slate-500 sm:text-sm sm:leading-6 dark:bg-transparent dark:text-slate-100' placeholder={`Type the ${label}`} />
        {errors[`${name}`] && (
            <span className='text-sm text-red-600'>{label} is required</span>
        )}
      </div>
    </div>
  )
}

export default TextInput
