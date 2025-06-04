
import FormHeader from '@/components/shared/dashboard/layout/FormHeader'
import NewCategoryForm from '@/components/shared/dashboard/categories/NewCategoryForm'
import { getData } from '@/lib/getData'

import React from 'react'

const NewCategory = async() => {
  const marketsData=await getData("markets")
  const markets=marketsData?.map((market:any)=>{
    return{
      id:market.id,
      title:market.title
    }
  })
  
    return (
    <div>
     <FormHeader title={"New Category"}/>
   <NewCategoryForm markets={markets}/>
    </div>
  )
}

export default NewCategory
