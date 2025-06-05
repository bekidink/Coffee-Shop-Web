import FormHeader from "@/components/shared/dashboard/layout/FormHeader";
import NewProductForm from "@/components/shared/dashboard/products/NewProductForm";
import { getData } from "@/lib/getData";
import React from "react";

// Define interfaces for data structures
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

interface UpdateCouponProps {
  params: {
    id: string,
  };
}

const UpdateCoupon: React.FC<UpdateCouponProps> = async ({
  params: { id },
}) => {
  
  const product: Product = await getData(`products/${id}`);
  console.log("pro",product)
  const categoriesData: Category[] = await getData("categories");
  const categories: Category[] = categoriesData.map((category: Category) => ({
    id: category.id,
    name: category.name,
  }));

  const usersData: unknown = await getData("users");

  // Type guard to check if usersData is an array
  const farmersData: Farmer[] = Array.isArray(usersData)
    ? usersData.filter((user: Farmer) => user.role === "FARMER")
    : [];

  const farmers: Farmer[] = farmersData.map((farmer: Farmer) => ({
    id: farmer.id,
    title: farmer.name ?? "", // Use empty string as fallback if name is undefined
  }));

  return (
    <div>
      <FormHeader title="Update Product" />
      <NewProductForm
        updateData={product}
        categories={categories}
        farmers={farmers}
      />
    </div>
  );
};

export default UpdateCoupon;
