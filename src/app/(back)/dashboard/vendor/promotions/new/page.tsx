
import FormHeader from "@/components/shared/dashboard/layout/FormHeader";
import NewPromotionForm from "@/components/shared/dashboard/promotions/NewPromotionForm";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getData } from "@/lib/getData";
import { Product, Shop } from "@/types";

const NewPromotion =async () => {
    const session=await getServerSession(authOptions)
  const shops:Shop[]=await getData('shops')

  const id=session?.user?.id
  const role=session?.user?.role

 
    return (
    <div>
     <FormHeader title={"New Promotion"}/>
    <NewPromotionForm shops={shops}/>
    </div>
  )
}

export default NewPromotion
