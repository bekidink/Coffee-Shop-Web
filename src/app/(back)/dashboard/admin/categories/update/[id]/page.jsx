
import FormHeader from "@/components/shared/dashboard/layout/FormHeader";
import NewCategoryForm from '@/components/shared/dashboard/categories/NewCategoryForm'
import { getData } from '@/lib/getData'
import React from 'react'

const UpdateCategory = async({params:{id}}) => {
  const category= await getData(`categories/${id}`)
  return (
    <div>
    <FormHeader title={"Update Category"}/>
  <NewCategoryForm updateData={category} />
   </div>
  )
}

export default UpdateCategory
