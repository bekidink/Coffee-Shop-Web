import DashboardCharts from "@/components/shared/dashboard/charts/DashboardCharts";
import Heading from "@/components/shared/dashboard/layout/Heading";
import LargeCards from "@/components/shared/dashboard/cards/LargeCards";
import UserDashboard from "@/components/shared/dashboard/layout/UserDashboard";
import { authOptions } from "@/lib/auth";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import SmallCards from "@/components/shared/dashboard/cards/SmallCards"
import { useSession } from "next-auth/react";
import React from "react";


const page = async () => {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;
  const sales = await getData("sales");
  const orders = await getData("orders");
  const products = await getData("products");
  console.log(role, "role");
  // if(role==="FARMER"){
  // return  <FarmerDashboard/>
  // }
  if (role === "CUSTOMER") {
    return <UserDashboard />;
  }
  return (
    <div>
      <Heading title={"Dashboard Overview"} />
      {/* {sales && <LargeCards sales={sales} orders={orders} />}
      {orders && <SmallCards orders={orders} />}
      <DashboardCharts sales={sales} /> */}
      {/* <CustomDataTable/> */}
    </div>
  );
};

export default page;
