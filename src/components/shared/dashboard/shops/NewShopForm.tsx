"use client";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { UserRole } from "@/types/next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextareaInput from "../../Forminputs/TextArea";
import ImageInput from "../../Forminputs/ImageInput";
import SelectInput from "../../Forminputs/SelectInput";
import TextInput from "../../Forminputs/TextInput";
import SubmitButton from "../../Forminputs/SubmitButton";
export interface Vendor {
  id: string;
  name: string;
  role: UserRole;
}
export type ShopProps = {
  id: string;
  name: string;
  vendorId: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  status: "PENDING" | "APPROVED" | "REJECTED"; // Extend this if other statuses exist
  averageRating: number;
};

interface Props {
  vendors: Vendor[];
  data?: ShopProps;
}
const NewShopForm = ({ vendors, data }: Props) => {
  const [loading, setLoading] = useState(false);
  const initialImageUrl = data?.imageUrl ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const Id = data?.id ?? "";
  console.log("data",data)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...data,
    },
  });
  const router = useRouter();
  function redirect() {
    router.push("/dashboard/admin/shop");
  }
  async function onSubmit(data: any) {
    setLoading(true);

    data.imageUrl = imageUrl;

    // data.vendorId = "fa1ec582-480d-4a32-a52c-5de008aad7e2";
    if (Id) {
      makePutRequest(
        setLoading,
        `shops/${Id}`,
        data,
        "Shop",
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "shops",
        data,
        "Shop ",
        reset,
        redirect
      );
    }

   
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
            label={"shop Title"}
            name={"name"}
            errors={errors}
            register={register}
          />
          <SelectInput
            label={"Select Vendor"}
            name={"vendorId"}
            register={register}
            // errors={errors}
            className="w-full"
            options={vendors}
          />

          <ImageInput
            label={"Shop Images"}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="imageUploader"
          />
          <TextareaInput
            label={"Shop Description"}
            name={"description"}
            register={register}
            errors={errors}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={"Create Shop"}
          loadingButtonTitle={"Creating Shop please wait..."}
        />
      </form>
    </div>
  );
};

export default NewShopForm;
