"use client"
import FormHeader from '@/components/backoffice/FormHeader'
import NewCategoryForm from '@/components/backoffice/NewCategoryForm'
import { getData } from '@/lib/getData'
import React from 'react'

const UpdateCategory = async({params:{id}}) => {
  const category= await getData(`banners/${id}`)
  return (
    <div>
    <FormHeader title={"Update Category"}/>
  <NewCategoryForm updateData={category} />
   </div>
  )
}

export default UpdateCategory
