import DataTable from '@/components/shared/dashboard/data-table-components/DataTable'
import { getData } from '@/lib/getData'
import { columns } from './columns'
import PageHeader from "@/components/shared/dashboard/layout/PageHeader"
const page = async() => {
  const categories=await getData("categories")
  return (
    <div>
      <PageHeader
        heading={"Category"}
        href={"/dashboard/admin/categories/new"}
        LinkTitle={"Add Category"}
      />
      <div className="py-8">
        {categories && (
          <DataTable
            data={categories}
            columns={columns}
            filterKeys={["name"]}
          />
        )}
      </div>
    </div>
  );
}

export default page
