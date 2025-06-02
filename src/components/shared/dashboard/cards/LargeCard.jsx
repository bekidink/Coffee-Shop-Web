import { Layers } from 'lucide-react'
import React from 'react'

const LargeCard = ({item}) => {
  return (
    <div className={`rounded-lg text-white shadow-md p-8 flex items-center flex-col gap-2 ${item.color}`}>
    <Layers/>
    <h4 className=''>{item.period}</h4>
    <h2 className='lg:text-3xl text-2xl'>{item.sales} </h2>
  </div>
  )
}

export default LargeCard
