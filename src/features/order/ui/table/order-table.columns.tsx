import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Order } from "../../domain/order.types";
import { RowActions } from "@/components/common/data-table/row-actions";
import { useNavigate } from "react-router-dom";

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0"
      >
        Order No.
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "customerName",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0"
      >
        Customer
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "total",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0"
      >
        Total
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => `₹${row.original.total.toLocaleString("en-IN")}`,
  },

  {
    accessorKey: "status",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0"
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <span className="capitalize">{row.original.status}</span>
    ),
  },

  {
    accessorKey: "createdAt",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0"
      >
        Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },

  {
    id: "actions",

    cell: ({ row }) => {
      const navigate = useNavigate();

      return (
        <RowActions
          actions={[
            {
              label: "View",
              icon: "Eye",
              onClick: () => navigate(`/orders/${row.original.id}`),
            },
            {
              label: "Edit",
              icon: "Pencil",
              onClick: () => console.log("edit"),
            },
            {
              label: "Delete",
              icon: "Trash2",
              variant: "destructive",
              onClick: () => console.log("Delete clicked"),
            },
          ]}
        />
      );
    },
  },
];
