import React from 'react'
import SmallCard from './SmallCard'
import { CheckCheck, Loader2, RefreshCcw, ShoppingCart } from 'lucide-react'

const SmallCards = ({orders}) => {
  const status={
   pending: "PENDING",
 processing: "PROCESSING",
shipped:  "SHIPPED",
 delivered: "DELIVERED",
canceled:  "CANCELED"
  }
  function getOrdersCountByStatus(status){
    const filteredOrders=orders.filter((order)=>order.orderStatus===status)
    const count =filteredOrders.length.toString().padStart(2,"0")
    return count
  }
  const orderCount=orders.length.toString().padStart(2,"0");
  const pendingOrdersCount=getOrdersCountByStatus(status.pending)
  const processingOrdersCount=getOrdersCountByStatus(status.processing)
  const deliveredOrdersCount=getOrdersCountByStatus(status.delivered)
  const orderStatus=[
    {
   title:"Total Order",
    sales:orderCount,
    iconBg:"bg-green-600",
    icon:ShoppingCart

},
{
   title:"Orders Pending",
    sales:pendingOrdersCount,
    iconBg:"bg-blue-600",
    icon:Loader2

},
{
   title:"Order Processing",
    sales:processingOrdersCount,
    iconBg:"bg-orange-600",
    icon:RefreshCcw

},
{
   title:"Orders Delivered",
    sales:deliveredOrdersCount,
    iconBg:"bg-purple-600",
    icon:CheckCheck

}
]
  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8'>
        {
            orderStatus.map((item,i)=>(
                <SmallCard  key={i} item={item} />
            ))
        }
    </div>
  )
}

export default SmallCards
