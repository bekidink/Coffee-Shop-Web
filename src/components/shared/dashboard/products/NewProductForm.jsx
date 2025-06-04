"use client";
import ItemsInput from "@/components/shared/Forminputs/ItemsInput";
import SelectInput from "@/components/shared/Forminputs/SelectInput";
import SubmitButton from "@/components/shared/Forminputs/SubmitButton";
import TextareaInput from "@/components/shared/Forminputs/TextArea";
import TextInput from "@/components/shared/Forminputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MultiImageInput from "@/components/shared/Forminputs/MultiImageInput";
import VariantsInput from "../../Forminputs/VariantsInput";

const NewProductForm = ({categories,farmers,updateData={}}) => {
  const [variants, setVariants] = useState([]);
  const initialImageUrl=updateData?.imageUrl ?? ""
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const initialtags=updateData?.tags ?? []
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(initialtags);
  const Id=updateData?.id ?? ""
  const[productImages,setProductImages]=useState([])
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      isActive: true,
      isWholesale:false,
      ...updateData
    },
  });
  const isActive = watch("isActive");
  const isWholesale=watch("isWholesale")
  const router=useRouter()
  function redirect(){
    router.push("/dashboard/admin/products")
  }
  async function onSubmit(data) {
    setLoading(true);
    
    
    data.thumbnailUrl=productImages[0]
    data.imageUrls = productImages;
    data.variants = tags;
    if(Id){
      makePutRequest(setLoading,`api/products/${Id}`,data,'Product',redirect)
    }else{
      makePostRequest(setLoading, "products", data, "Product ", reset,redirect);
    }
    
    console.log(data);
    // setProductImages([])
    // setTags([])
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label={"Product Title"}
            name={"name"}
            errors={errors}
            register={register}
          />
        
          
         
          
          <SelectInput
            label={"Select Category"}
            name={"categoryId"}
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
            multiple={false}
          />
          <SelectInput
            label={"Select shop"}
            name={"farmerId"}
            register={register}
            errors={errors}
            className="w-full"
            options={farmers}
          />

          

          <VariantsInput
            variants={variants}
            setVariants={setVariants}
            itemTitle="Variant"
          />
          {/* <ItemsInput setItems={setTags} items={tags} itemTitle="Tag"/> */}

          <MultiImageInput
            label={"Product Images"}
            imageUrls={productImages}
            setImageUrls={setProductImages}
            endpoint="multiProductsUploader"
          />
          <TextareaInput
            label={"Product Description"}
            name={"description"}
            register={register}
            errors={errors}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={"Create Product"}
          loadingButtonTitle={"Creating Product please wait..."}
        />
      </form>
    </div>
  );
};

export default NewProductForm;
