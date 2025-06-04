"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { X } from "lucide-react";
import ImageInput from "@/components/shared/Forminputs/ImageInput";
import SelectInput from "@/components/shared/Forminputs/SelectInput";
import SubmitButton from "@/components/shared/Forminputs/SubmitButton";
import TextareaInput from "@/components/shared/Forminputs/TextArea";
import TextInput from "@/components/shared/Forminputs/TextInput";
import ToggleInput from "@/components/shared/Forminputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";

interface FormData {
  name: string;
  description: string;
  
  imageUrl?: string;
  id?: string;
}

interface Market {
  id: string;
  title: string;
}

interface NewCategoryFormProps {
  updateData?: Partial<FormData>;
  markets: Market[];
}

const NewCategoryForm: React.FC<NewCategoryFormProps> = ({
  updateData = {},
  markets,
}) => {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [loading, setLoading] = useState<boolean>(false);
  const categoryId = updateData?.id ?? "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control
  } = useForm<FormData>({
    defaultValues: {
      
      ...updateData,
    },
  });

  const router = useRouter();
  function redirect() {
    router.push("/dashboard/admin/categories");
  }


  async function onSubmit(data: FormData) {
    setLoading(true);
    // const slug = generateSlug(data.title);
    // data.slug = slug;
    data.imageUrl = imageUrl;
    if (categoryId) {
      data.id = categoryId;
      makePutRequest(
        setLoading,
        `categories/${categoryId}`,
        data,
        "Category",
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "categories",
        data,
        "Category",
        reset,
        redirect
      );
    }
    console.log(data);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Category Title"
            name="name"
            errors={errors}
            register={register}
            className="w-full"
          />
          {/* <SelectInput
            label="Select Market"
            name="marketIds"
            register={register}
            // errors={errors}
            className="w-full"
            options={markets}
            multiple={true}
          /> */}
          <TextareaInput
            label="Category Description"
            name="description"
            register={register}
            errors={errors}
          />
          <ImageInput
            label="Category Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="imageUploader"
          />
          {/* <ToggleInput
            label="Publish your Category"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
            control={control}
          /> */}
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={categoryId ? "Update Category" : "Create Category"}
          loadingButtonTitle={
            categoryId
              ? "Updating Category please wait..."
              : "Creating Category please wait..."
          }
        />
      </form>
    </div>
  );
};

export default NewCategoryForm;
