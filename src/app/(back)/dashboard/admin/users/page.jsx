import PageHeader from '@/components/backoffice/PageHeader'
import TableAction from '@/components/backoffice/TableAction'
import { getData } from '@/lib/getData'
import React from 'react'
import { columns } from './columns'
import DataTable from '@/components/data-table-components/DataTable'

const page = async() => {
  const customersData=await getData("customers")
  
  return (
    <div>
     {/* <PageHeader heading={"Farmers"} href={"/dashboard/farmers/new"} LinkTitle={"Add Farmer"}/> */}
     <div className="py-8">
      <DataTable data={customersData} columns={columns} filterKeys={['email']}  />
     </div>
    </div>
  )
}

export default page
