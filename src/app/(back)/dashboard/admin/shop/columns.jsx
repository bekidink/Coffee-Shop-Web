"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Checkbox } from "@/components/ui/checkbox"
import SortableColumn from "@/components/datatablecolumns/SortableColumn"
import ImageColumn from "@/components/datatablecolumns/ImageColumn"
import DateColumn from "@/components/datatablecolumns/DateColumn"
import ActionColumn from "@/components/datatablecolumns/ActionColumn"
import Status from "@/components/datatablecolumns/Status"


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
  {
    accessorKey: "email",
    header: ({ column }) => (<SortableColumn column={column} title={'Email'}/>)
  },
  
//   {
//     accessorKey: "description",
//     header: "Description",
//     cell:({row})=>{
//         const description=row.getValue('description')
//         return <div className="line-clamp-1">
//             {description}
//         </div>
//     }
//   },
  {
    accessorKey: "emailVerified",
    header: "Email Verified",
   
  },
  {
    accessorKey: "role",
    header: "Role",
   
  },
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
    const farmer=row.original 
  return  (<ActionColumn row={row} title={'Farmer'} endpoint={`farmers/${farmer.id}`}/>)
  }
  },
  
]
