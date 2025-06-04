import DataTable from '@/components/shared/dashboard/data-table-components/DataTable'
import { getData } from '@/lib/getData'
import PageHeader from "@/components/shared/dashboard/layout/PageHeader";
import { columns } from './columns'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

const page = async() => {
  const session=await getServerSession(authOptions)
  // if(!session){
  //   return null
  // }
  const products=await getData('products')

  const id=session?.user?.id
  const role=session?.user?.role
  const farmerProudcts=products.filter((product)=>product.userId===id)
  return (
    <div>
     <PageHeader heading={"Products"} href={"/dashboard/admin/products/new"} LinkTitle={"Add Product"}/>
     <div className="py-8">
      {role==="ADMIN"?(<DataTable data={products} columns={columns} filterKeys={['title']} />):(
        <DataTable data={farmerProudcts} columns={columns} filterKeys={['title']} />
      )}
      
     </div>
    </div>
  )
}

export default page
