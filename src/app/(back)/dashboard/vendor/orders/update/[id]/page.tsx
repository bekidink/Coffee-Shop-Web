import SalesInvoice from "@/components/shared/dashboard/orders/SalesInvoice";
import { getData } from "@/lib/getData";
import React from "react";
interface OrderProps {
  params: {
    id: string;
  };
}
const Order: React.FC<OrderProps> = async ({
  params: { id },
}) => {
   const order=await getData(`orders/${id}`)
   console.log(order)
  return (
    
      <SalesInvoice order={order} />
  
  );
}
export default Order