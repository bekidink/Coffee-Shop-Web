import FormHeader from "@/components/shared/dashboard/layout/FormHeader";
import { getData } from '@/lib/getData'
import React from 'react'

export default async function page({params:{id}}) {
    const user=await getData(`users/${id}`)
  return (
    <div>
      <FormHeader title={"Update Customer"}/>
      {/* <CustomerForm user={user}/> */}
    </div>
  )
}
