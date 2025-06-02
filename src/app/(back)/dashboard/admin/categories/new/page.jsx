
import FormHeader from '@/components/backoffice/FormHeader'
import NewCategoryForm from '@/components/backoffice/NewCategoryForm'
import { getData } from '@/lib/getData'

import React from 'react'

const NewCategory = async() => {
  const marketsData=await getData("markets")
  const markets=marketsData.map((market)=>{
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
