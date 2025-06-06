import PageHeader from '@/components/shared/dashboard/layout/PageHeader'
import { getData } from '@/lib/getData'
import React from 'react'
import { columns } from './columns'
import DataTable from '@/components/shared/dashboard/data-table-components/DataTable'
import { ShopProps } from '@/components/shared/dashboard/shops/NewShopForm'
interface Farmer {
  id: string;
  title?: string;
  role?: string;
  name?: string;
}

const page = async() => {
  const shopsData: ShopProps[] = await getData("shops");
      // const shops: Farmer[] = shopsData.map((farmer: Farmer) => ({
      //   id: farmer.id,
      //   name: farmer.name ?? "", // Use empty string as fallback if name is undefined
      // }));
  return (
    <div>
     <PageHeader heading={"Shops"} href={"/dashboard/admin/shop/new"} LinkTitle={"Add Shop"}/>
     <div className="py-8">
      <DataTable data={shopsData} columns={columns} filterKeys={['name']}  />
     </div>
    </div>
  )
}

export default page
