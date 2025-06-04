"use client"

import { Checkbox } from "@/components/ui/checkbox"
import SortableColumn from "@/components/shared/datatablecolumns/SortableColumn"
import ImageColumn from "@/components/shared/datatablecolumns/ImageColumn"
import DateColumn from "@/components/shared/datatablecolumns/DateColumn"
import ActionColumn from "@/components/shared/datatablecolumns/ActionColumn"


export const columns = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
  {
    accessorKey: "name",
    header: ({ column }) => (<SortableColumn column={column} title={'Title'}/>)
  },
  {
    accessorKey: "imageUrl",
    header: "Category Image",
    cell:({row})=>(<ImageColumn row={row} imageTitle={'imageUrl'}/>)
  },
  {
    accessorKey: "description",
    header: "Description",
    cell:({row})=>{
        const description=row.getValue('description')
        return <div className="line-clamp-1">
            {description}
        </div>
    }
  },
  // {
  //   accessorKey: "isActive",
  //   header: "Active",
   
  // },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell:({row})=>(<DateColumn row={row} accessorKey={'createdAt'}/>)
  },
  {id:"actions",
  cell: ({ row }) => {
    const category=row.original
    return (<ActionColumn row={row} title={'Category'} endpoint={`categories/${category.id}`} editEndpoint={`admin/categories/update/${category.id}`}/>)
  }
  },
  
]
