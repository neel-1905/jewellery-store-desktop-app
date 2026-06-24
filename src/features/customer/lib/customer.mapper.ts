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
    createdAt: dbCustomer.created_at,
    updatedAt: dbCustomer.updated_at,
  };
}
