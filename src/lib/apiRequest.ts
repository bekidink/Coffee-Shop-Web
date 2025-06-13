import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";
export async function makePostRequest(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  endpoint: string,
  data: unknown,
  resourceName: string,
  reset: () => void,
  redirect: () => void
) {
  try {
    setLoading(true);
    const session = await getSession();
    const token = session?.user?.access_token;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setLoading(false);
      toast.success(`New ${resourceName} Created Successfully`);
      reset();
      redirect();
    } else {
      setLoading(false);
      if (response.status === 409) {
        toast.error("The Giving Warehouse Stock is NOT Enough");
      } else {
        toast.error("Something Went wrong");
      }
    }
  } catch (error: unknown) {
    setLoading(false);
    console.log(error);
  }
}

export async function makePutRequest(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  endpoint: string,
  data: unknown,
  resourceName: string,
  redirect: () => void
) {
  try {
    setLoading(true);
    const session = await getSession();
    const token = session?.user?.access_token;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log(response);
      setLoading(false);
      toast.success(`${resourceName} Updated Successfully`);
      redirect();
    } else {
      setLoading(false);
      toast.error("Something Went wrong");
    }
  } catch (error: unknown) {
    setLoading(false);
    console.log(error);
  }
}
