"use client";
import ImageInput from "@/components/Forminputs/ImageInput";
import ItemsInput from "@/components/Forminputs/ItemsInput";
import SelectInput from "@/components/Forminputs/SelectInput";
import SubmitButton from "@/components/Forminputs/SubmitButton";
import TextareaInput from "@/components/Forminputs/TextArea";
import TextInput from "@/components/Forminputs/TextInput";
import ToggleInput from "@/components/Forminputs/ToggleInput";
import FormHeader from "@/components/backoffice/FormHeader";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import generateUserCode from "@/lib/generateUserCode";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MultiImageInput from "../Forminputs/MultiImageInput";

const NewProductForm = ({categories,farmers,updateData={}}) => {
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
    router.push("/dashboard/products")
  }
  async function onSubmit(data) {
    setLoading(true);
    const slug = generateSlug(data.title);
    const productCode=generateUserCode('bbp',data.title)
    data.slug = slug;
    data.qty=1;
    data.productCode=productCode;
    data.productImages=productImages
    data.tags=tags;
    if(Id){
      makePutRequest(setLoading,`api/products/${Id}`,data,'Product',redirect)
    }else{
      makePostRequest(setLoading, "api/products", data, "Product ", reset,redirect);
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
            name={"title"}
            errors={errors}
            register={register}
          />
          <TextInput
            label={"Product SKU"}
            name={"sku"}
            errors={errors}
            register={register}
            className="w-full"
          />
          <TextInput
            label={"Product Barcode"}
            name={"barcode"}
            errors={errors}
            register={register}
            className="w-full"
          />
          <TextInput
            label={"Product Price(Before Discount)"}
            name={"productPrice"}
            errors={errors}
            register={register}
            type="number"
            className="w-full"
          />
          <TextInput
            label={"Product Sale Price(Discounted)"}
            name={"salePrice"}
            errors={errors}
            register={register}
            type="number"
            className="w-full"
          />
           <TextInput
            label={"Product Stock"}
            name={"productStock"}
            errors={errors}
            register={register}
            type="number"
            className="w-full"
          />
            <TextInput
            label={"Unit of Measurement(eg Kilograms)"}
            name={"unit"}
            errors={errors}
            register={register}
            type="number"
            className="w-full"
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
            label={"Select Farmer"}
            name={"farmerId"}
            register={register}
            errors={errors}
            className="w-full"
            options={farmers}
          />
          <ToggleInput
  label="Supports Wholesale Selling"
   name={isWholesale}
   trueTitle="Supported"
   falseTitle="Not Supported"
   register={register}
  />
           {isWholesale && (
            <>
             <TextInput
            label={"Wholesale Price"}
            name={"wholesalePrice"}
            errors={errors}
            register={register}
            type="number"
            className="w-full"
          />
            <TextInput
            label={"Minimum Whole Qty"}
            name={"wholesaleQty"}
            errors={errors}
            register={register}
            type="number"
            className="w-full"
          />
            </>
           )}
           

          
         
         
         <ItemsInput setItems={setTags} items={tags} itemTitle="Tag"/>

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
          <ToggleInput
  label="Publish your Product"
   name={isActive}
   trueTitle="Active"
   falseTitle="Draft"
   register={register}
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
