import React from 'react'
import Heading from './Heading'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const PageHeader = ({heading,LinkTitle,href}) => {
  return (
    <div className="flex justify-between  mb-4">
    <Heading title={heading}/>
    <Link className='text-white h-20 bg-lime-600 hover:bg-lime-600/90 focus:ring-4  mt-3 focus:outline-none focus:ring-lime-600/50 font-medium rounded-lg text-base px-5  text-center inline-flex items-center dark:focus:ring-lime-600/55 me-2 space-x-3' href={href}>
      <Plus/>
      <span>{LinkTitle}</span>
    </Link>
  </div>
  )
}

export default PageHeader
