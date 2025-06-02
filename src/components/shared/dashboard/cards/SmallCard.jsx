import { ShoppingCart } from 'lucide-react'
import React from 'react'

const SmallCard = ({item}) => {
  const {title,sales,iconBg,icon:Icon}=item
  return (
    <div className='rounded-lg shadow-lg bg-slate-50 dark:bg-slate-700 p-4 text-slate-800 dark:text-slate-50'>
      <div className="flex space-x-4">
       
        <div className={`w-12 h-12 ${iconBg} rounded-full items-center flex justify-center`}>
        <Icon className=" dark:text-slate-50 text-slate-50"/>
          </div>
          <div className="">
            <p>{title}</p>
            <h3 className='text-2xl font-bold'>{sales}</h3>
          </div>
      </div>
    </div>
  )
}

export default SmallCard
