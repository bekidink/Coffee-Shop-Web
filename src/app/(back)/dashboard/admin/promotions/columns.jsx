"use client"

import { Checkbox } from "@/components/ui/checkbox";
import ImageColumn from "@/components/shared/datatablecolumns/ImageColumn";
import DateColumn from "@/components/shared/datatablecolumns/DateColumn";
import ActionColumn from "@/components/shared/datatablecolumns/ActionColumn";
import SortableColumn from "@/components/shared/datatablecolumns/SortableColumn";


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
    accessorKey: "type",
    header: ({ column }) => <SortableColumn column={column} title={"title"} />,
  },
  {
    accessorKey: "product.thumbnailUrl",
    header: "Promotion Image",
    cell: ({ row }) => <ImageColumn row={row} imageTitle="imageUrl" />,
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
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey={"createdAt"} />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const banner = row.original;
      return (
        <ActionColumn
          row={row}
          title="Promotion"
          endpoint={`promotions/${banner.id}`}
          editEndpoint={`promotions/update/${banner.id}`}
        />
      );
    },
  },
];
