import { getSession } from "next-auth/react";
export async function getData(endpoint: string) {
  try {
    const session = await getSession();
    const token = session?.user?.access_token;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
