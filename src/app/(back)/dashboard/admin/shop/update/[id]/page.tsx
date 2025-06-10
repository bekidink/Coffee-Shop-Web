
import FormHeader from "@/components/shared/dashboard/layout/FormHeader";
import NewShopForm, { ShopProps, Vendor } from "@/components/shared/dashboard/shops/NewShopForm";
import { getData } from "@/lib/getData";
interface UpdateShopProps {
  params: {
    id: string;
  };
}
import React, { useState } from "react";

const NewFarmer: React.FC<UpdateShopProps> = async ({ params: { id } }) => {
   console.log("params",id)
    const shop: ShopProps = await getData(`shops/${id}`);
    const usersData: Vendor = await getData("users");
 
  // Type guard to check if usersData is an array
  const vendorsData: Vendor[] = Array.isArray(usersData)
    ? usersData.filter((user: Vendor) => user.role === "VENDOR")
    : [];

  const vendors: Vendor[] = vendorsData.map((vendor: Vendor) => ({
    id: vendor.id,
    name: vendor.name ?? "",
    role: vendor.role,
  }));

  return (
    <div>
      <FormHeader title={"New Shop"} />
      <NewShopForm vendors={vendors} data={shop}/>
    </div>
  );
};

export default NewFarmer;
