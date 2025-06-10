import FormHeader from "@/components/shared/dashboard/layout/FormHeader";
import NewProductForm from "@/components/shared/dashboard/products/NewProductForm";
import { getData } from '@/lib/getData'
import React from 'react'
interface Category {
  id: string;
  name: string;
}

interface Farmer {
  id: string;
  title?: string;
  role?: string;
  name?: string;
}

interface Product {
  id: string;
  // Add other product properties as needed
  [key: string]: any;
}
const NewProduct = async() => {
  const categoriesData:Category[]=await getData("categories")
  const categories: Category[] = categoriesData.map((category) => {
    return {
      id: category.id,
      name: category.name,
    };
  });
  
    // Type guard to check if usersData is an array
    const shopsData: Farmer[] = await getData("shops");
   console.log("shops",shopsData)
    const shops: Farmer[] = shopsData.map((farmer: Farmer) => ({
      id: farmer.id,
      name: farmer.name ?? "", // Use empty string as fallback if name is undefined
    }));
  
  return (
    <div className="">
       <FormHeader title={"New Product"}/>
     <NewProductForm categories={categories} farmers={shops} />
    </div>
   
  )
}

export default NewProduct
