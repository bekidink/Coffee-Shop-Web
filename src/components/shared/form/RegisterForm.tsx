"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";
import SubmitButton from "../Forminputs/SubmitButton";
import TextInput from "../Forminputs/TextInput";

export default function RegisterForm({role}:any) {
  const router = useRouter();
  const searchParams=useSearchParams()
  const plan=searchParams.get("plan")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  async function onSubmit(data:any) {
    try {
      data.plan=plan
      setLoading(true);
      data.role=role
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setLoading(false);
        toast.success("User Created Successfully");
        reset();
     if(role==="USER"){
      router.push("/")
     }else{
      const {data}=responseData
      router.push(`/verify-email?userId=${data.id}`)
// router.push(`onboarding/${responseData.data.id}`)
     }
        // router.push("/login");
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr("User with this Email already exists");
          toast.error("User with this Email already exists");
        } else {
          // Handle other errors
          console.error("Server Error:", responseData.message);
          toast.error("Oops Something Went wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Something Went wrong, Please Try Again");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
     <TextInput label={"Full Name"} name={"name"} register={register} errors={errors}  />
     <TextInput label={"Email Address"} name={"email"} register={register} errors={errors} type="email" />
     {emailErr && <small className="text-red-600 -mt-2 mb-2">{emailErr}</small>}
      <TextInput label={"Password"} name={"password"} register={register} errors={errors} type="password"/>
      <SubmitButton isLoading={loading} buttonTitle={"Register"} loadingButtonTitle={"Registering Please wait..."}/>
      
     <div className="flex gap-2">
     <p className="text-[0.75rem] font-light text-gray-500 dark:text-gray-400 py-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-purple-600 hover:underline dark:text-purple-500"
        >
          Login
        </Link>
      </p>
      {role==="FARMER"?(
         <p className="text-[0.75rem] font-light text-gray-500 dark:text-gray-400 py-4">
         Are you a User?{" "}
         <Link
           href="/register"
           className="font-medium text-purple-600 hover:underline dark:text-purple-500"
         >
           Register Here
         </Link>
       </p>
      ) : (
         <p className="text-[0.75rem] font-light text-gray-500 dark:text-gray-400 py-4">
         Are you a vendor?{" "}
         <Link
           href="/register-farmer"
           className="font-medium text-purple-600 hover:underline dark:text-purple-500"
         >
           Register Here
         </Link>
       </p>
      )}
     
     </div>
    </form>
  );
}