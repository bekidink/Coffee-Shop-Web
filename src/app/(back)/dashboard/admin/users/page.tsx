import PageHeader from '@/components/shared/dashboard/layout/PageHeader'
import { getData } from '@/lib/getData'
import React from 'react'
import { columns } from './columns'
import DataTable from '@/components/shared/dashboard/data-table-components/DataTable'

const page = async() => {
  const customersData = await getData("users/by-role?role=CUSTOMER");
  
  return (
    <div>
     <PageHeader heading={"Customers"} href={"/dashboard/admin/users/new"} LinkTitle={""}/>
     <div className="py-8">
      <DataTable data={customersData} columns={columns} filterKeys={['email']}  />
     </div>
    </div>
  )
}

export default page
