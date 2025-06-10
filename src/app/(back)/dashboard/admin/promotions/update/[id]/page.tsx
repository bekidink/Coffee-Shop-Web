import FormHeader from "@/components/shared/dashboard/layout/FormHeader";
import NewPromotionForm from "@/components/shared/dashboard/promotions/NewPromotionForm";
import { getData } from '@/lib/getData'
import React from 'react'
import { Product, Shop } from "@/types";
interface UpdatePromotionProps {
  params: {
    id: string;
  };
}
const NewPromotion: React.FC<UpdatePromotionProps> = async ({ params: { id } }) => {
    const shops:Shop[]=await getData('shops')
   
  const banner=await getData(`promotions/${id}`)
   
    return (
      <div>
        <FormHeader title={"Update Promotion"} />
        <NewPromotionForm shops={shops} updateData={banner} />
      </div>
    );
}

export default NewPromotion;