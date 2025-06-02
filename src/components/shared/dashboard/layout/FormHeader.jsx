"use client"
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const FormHeader = ({title}) => {
  const router=useRouter()
  return (
    <div className="flex items-center justify-between py-6 px-12 bg-slate-50 text-slate-800 dark:text-slate-50 dark:bg-slate-600 rounded-lg shadow mb-12">
    <h2 className='text-xl font-semibold'>{title}</h2>
    <button onClick={()=>router.back()}>
        <X/>
    </button>
  </div>
  )
}

export default FormHeader
