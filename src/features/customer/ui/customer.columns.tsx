import { ColumnDef } from "@tanstack/react-table";

import { Customer } from "../domain/customer.types";
import { RowActions } from "@/components/common/data-table/row-actions";
import CustomerFormDialog from "./form/customer-form-dialog";
import { useState } from "react";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
import { useNavigate } from "react-router-dom";

export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "customerCode",
    header: "Code",
  },

  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.original.phone ?? "-",
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email ?? "-",
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const customer = row.original;
      const navigate = useNavigate();

      const { mutate: deleteCustomer } = useDeleteCustomer();

      return (
        <>
          <RowActions
            actions={[
              {
                label: "View",
                icon: "Eye",
                onClick: () => navigate(`/customers/${customer.id}`),
              },
              {
                label: "Edit",
                icon: "Pencil",
                onClick: () => setOpen(true),
              },
              {
                label: "Delete",
                icon: "Trash2",
                variant: "destructive",
                onClick: () => deleteCustomer(customer.id),
              },
            ]}
          />

          <CustomerFormDialog
            mode="edit"
            customerId={customer.id}
            open={open}
            onOpenChange={setOpen}
          />
        </>
      );
    },
  },
];
