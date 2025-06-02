"use client";
import ImageInput from "@/components/Forminputs/ImageInput";
import SubmitButton from "@/components/Forminputs/SubmitButton";
import TextInput from "@/components/Forminputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CustomerForm = ({user}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [crops,setCrops]=useState([])
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      isActive: true,
      ...user
    },
  });
  const router=useRouter()
  function redirect(){
    router.push("/dashboard/customers")
  }
  async function onSubmit(data) {
    setLoading(true);
    
    data.userId=user.id;
    
    data.profileImage = imageUrl;
    makePutRequest(setLoading, `api/customers/${user.id}`, data, "Customer Profile ", redirect,reset);
    console.log(data);
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="w-full max-w-3xl mx-auto  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
         <h2 className="text-xl font-semibold mb-4 dark:text-lime-600">Personal Details</h2>
         <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 border-b border-gray-700 pb-10">
         <TextInput label={"Full Name"} name={"name"} errors={errors} register={register} className='w-full'/>
         <TextInput label={"User Name"} name={"userName"} errors={errors} register={register} className='w-full'/>
         <TextInput label={"Email Address"} name={"email"} errors={errors} register={register} type='email' className='w-full'/>
            <TextInput label={"First Name"} name={"firstName"} errors={errors} register={register} className='w-full'/>
            <TextInput label={"Last Name"} name={"lastName"} errors={errors} register={register} className='w-full'/>
           
            <TextInput label={"Date Of Birth"} name={"dateOfBirth"} errors={errors} register={register} type='date' className='w-full'/>
            <TextInput label={"Phone Number"} name={"phone"} errors={errors} register={register} type='tel' className='w-full'/>
            <ImageInput imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="customerImageUploader" label={"Customer Profile Image"} />
        </div>
        <h2 className="text-xl font-semibold mb-4 dark:text-lime-600 pt-10">Shipping Details</h2>
         <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <TextInput label={"Street Address"} name={"streetAddress"} errors={errors} register={register} className='w-full'/>
            <TextInput label={"District Address"} name={"district"} errors={errors} register={register}  className='w-full'/>
            <TextInput label={"City"} name={"city"} errors={errors} register={register} className='w-full'/>
            <TextInput label={"Country"} name={"country"} errors={errors} register={register}  className='w-full'/>
            
          


        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={"Create Farmer"}
          loadingButtonTitle={"Creating Farmer please wait..."}
        />
      </form>
    </div>
  );
};

export default CustomerForm;
