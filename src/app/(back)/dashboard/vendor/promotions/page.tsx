import PageHeader from '@/components/shared/dashboard/layout/PageHeader'
import { getData } from '@/lib/getData'
import { columns } from './columns'
import DataTable from '@/components/shared/dashboard/data-table-components/DataTable'
const page = async() => {
  const banners=await getData("promotions")
  return (
    <div>
    <PageHeader heading={"Promotions"} href={"/dashboard/admin/promotions/new"} LinkTitle={"Add Promotion"}/>
    <div className="py-8">
      <DataTable data={banners} columns={columns} filterKeys={['type']} />
     </div>
   </div>
  )
}

export default page
