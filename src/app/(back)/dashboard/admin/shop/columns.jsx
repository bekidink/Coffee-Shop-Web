"use client"

import { Checkbox } from "@/components/ui/checkbox"
import ImageColumn from "@/components/shared/datatablecolumns/ImageColumn"
import DateColumn from "@/components/shared/datatablecolumns/DateColumn"
import ActionColumn from "@/components/shared/datatablecolumns/ActionColumn"
import Status from "@/components/shared/datatablecolumns/Status"


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
        header: "Name",
      },
  // {
  //   accessorKey: "",
  //   header: ({ column }) => (<SortableColumn column={column} title={'Email'}/>)
  // },
  
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
  //   accessorKey: "emailVerified",
  //   header: "Email Verified",
   
  // },
  // {
  //   accessorKey: "role",
  //   header: "Role",
   
  // },
  // {
  //     accessorKey: "imageUrl",
  //     header: "Shop Image",
  //     cell: ({ row }) => <ImageColumn row={row} imageTitle={"imageUrl"} />,
  //   },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Status row={row} accessorKey="status" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell:({row})=>(<DateColumn row={row} accessorKey={'createdAt'}/>)
  },
  {id:"actions",
  cell: ({ row }) =>{
    const shop=row.original 
  return (
    <ActionColumn
      row={row}
      title={"Shop"}
      endpoint={`shops/${shop.id}`}
      editEndpoint={`/admin/shop/update/${shop.id}`}
    />
  );
  }
  },
  
]
