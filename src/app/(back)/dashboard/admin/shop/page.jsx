import PageHeader from '@/components/backoffice/PageHeader'
import TableAction from '@/components/backoffice/TableAction'
import { getData } from '@/lib/getData'
import React from 'react'
import { columns } from './columns'
import DataTable from '@/components/data-table-components/DataTable'

const page = async() => {
  const usersData=await getData("users")
  const farmersData=usersData.filter((user)=>user.role==="FARMER")
  const farmers=farmersData.map((farmer)=>{
    return {
      id:farmer.id,
      title:farmer.name
    }
  })
  return (
    <div>
     <PageHeader heading={"Farmers"} href={"/dashboard/farmers/new"} LinkTitle={"Add Farmer"}/>
     <div className="py-8">
      <DataTable data={farmersData} columns={columns} filterKeys={['email']}  />
     </div>
    </div>
  )
}

export default page
