"use client";

import FormHeader from "@/components/shared/dashboard/layout/FormHeader";
import NewShopForm, { Vendor } from "@/components/shared/dashboard/shops/NewShopForm";
import { getData } from "@/lib";

import React from "react";

const NewShop =async () => {
  
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
     <NewShopForm vendors={vendors}/>
    </div>
  );
};

export default NewShop;
