"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import NewFarmerForm from "@/components/backoffice/NewFarmerForm";

import React, { useState } from "react";

const NewFarmer = () => {
  
  
 

  return (
    <div>
      <FormHeader title={"New Farmer"} />
     <NewFarmerForm/>
    </div>
  );
};

export default NewFarmer;
