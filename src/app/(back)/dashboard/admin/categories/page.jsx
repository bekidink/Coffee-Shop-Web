import PageHeader from '@/components/backoffice/PageHeader'
import DataTable from '@/components/data-table-components/DataTable'
import { getData } from '@/lib/getData'
import { columns } from './columns'

const page = async() => {
  const categories=await getData("categories")
  return (
    <div>
     <PageHeader heading={"Category"} href={"/dashboard/categories/new"} LinkTitle={"Add Category"}/>
     <div className="py-8">
      <DataTable data={categories} columns={columns} filterKeys={['title']} />
     </div>
    </div>
  )
}

export default page
