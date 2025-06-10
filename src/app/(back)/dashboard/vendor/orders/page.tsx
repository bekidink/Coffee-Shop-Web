import OrderCard from "@/components/shared/dashboard/orders/OrderCard";
import { authOptions } from "@/lib/auth";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const orders = await getData(`orders/user/${session?.user?.id}`);
  // const orders=await getData(`orders/user/${session?.user?.id}`)
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Order Details
            </h1>
            <p className="mt-2 text-sm font-normal text-gray-600">
              Check the status of recent and old orders & discover more products
            </p>
          </div>

          <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
            {orders &&
              orders.map((order:any, i:number) => <OrderCard order={order} key={i} />)}
          </ul>
        </div>
      </div>
    </section>
  );
}
