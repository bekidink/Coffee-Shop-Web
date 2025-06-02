import PageHeader from '@/components/backoffice/PageHeader'

import { getData } from '@/lib/getData'
import { columns } from './columns'
import DataTable from '@/components/data-table-components/DataTable'

const page = async() => {
  const banners=await getData("banners")
  return (
    <div>
    <PageHeader heading={"Banners"} href={"/dashboard/banners/new"} LinkTitle={"Add Banner"}/>
    <div className="py-8">
      <DataTable data={banners} columns={columns} filterKeys={['title']} />
     </div>
   </div>
  )
}

export default page
