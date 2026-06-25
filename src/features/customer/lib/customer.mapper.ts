import { formatDateToDDMMMYYYY } from "@/lib/date.utils";
import { Customer, DBCustomer } from "../domain/customer.types";

export function mapDBCustomerToCustomer(dbCustomer: DBCustomer): Customer {
  return {
    id: dbCustomer.id,
    customerCode: dbCustomer.customer_code,
    name: dbCustomer.name,
    phone: dbCustomer.phone,
    email: dbCustomer.email,
    address: dbCustomer.address,
    notes: dbCustomer.notes,
    createdBy: dbCustomer.created_by,
    createdAt: formatDateToDDMMMYYYY(dbCustomer.created_at),
    updatedAt: formatDateToDDMMMYYYY(dbCustomer.updated_at),
  };
}
