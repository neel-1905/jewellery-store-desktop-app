import { getDb } from "@/db/database";
import {
  Customer,
  DBCustomer,
  GetCustomersParams,
} from "../domain/customer.types";

import { CustomerListResponse } from "../domain/customer.types";
import { mapDBCustomerToCustomer } from "./customer.mapper";
import { CustomerFormInput } from "../domain/customer.validations";
import { requireUser } from "@/features/auth/lib/auth.util";
import { generateCustomerCode } from "./customer.util";

export async function getCustomers({
  page,
  pageSize,
}: GetCustomersParams): Promise<CustomerListResponse> {
  const db = await getDb();

  const offset = (page - 1) * pageSize;

  const items = await db.select<DBCustomer[]>(
    `
      SELECT *
      FROM customers
      ORDER BY created_at DESC
      LIMIT ?
      OFFSET ?
    `,
    [pageSize, offset],
  );

  const countResult = await db.select<{ count: number }[]>(
    `
      SELECT COUNT(*) as count
      FROM customers
    `,
  );

  return {
    items: items.map(mapDBCustomerToCustomer),
    totalCount: countResult[0]?.count || 0,
    page,
    pageSize,
  };
}

export const createCustomer = async (data: CustomerFormInput) => {
  const user = await requireUser();
  const db = await getDb();

  const result = await db.execute(
    `
      INSERT INTO customers (
        name,
        phone,
        email,
        address,
        notes,
        created_by
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      data.name,
      data.phone ?? null,
      data.email ?? null,
      data.address ?? null,
      data.notes ?? null,
      user.id,
    ],
  );

  const customerId = result.lastInsertId;

  const customerCode = generateCustomerCode(customerId!);

  await db.execute(
    `
      UPDATE customers
      SET customer_code = ?
      WHERE id = ?
    `,
    [customerCode, customerId],
  );

  return customerId;
};

export async function getCustomerById(customerId: number): Promise<Customer> {
  const db = await getDb();

  const customer = (
    await db.select<DBCustomer[]>(
      `
        SELECT *
        FROM customers
        WHERE id = ?
      `,
      [customerId],
    )
  )[0];

  if (!customer) {
    throw new Error("Customer not found");
  }

  return mapDBCustomerToCustomer(customer);
}

export async function updateCustomer(
  data: CustomerFormInput & { customerId: number },
): Promise<void> {
  await requireUser();

  const db = await getDb();

  const result = await db.execute(
    `
      UPDATE customers
      SET
        name = ?,
        phone = ?,
        email = ?,
        address = ?,
        notes = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    [
      data.name,
      data.phone ?? null,
      data.email ?? null,
      data.address ?? null,
      data.notes ?? null,
      data.customerId,
    ],
  );

  if (result.rowsAffected === 0) {
    throw new Error("Customer not found");
  }
}

export const deleteCustomer = async (customerId: number) => {
  await requireUser();

  const db = await getDb();

  const result = await db.execute(
    `
      DELETE FROM customers
      WHERE id = ?
    `,
    [customerId],
  );

  if (result.rowsAffected === 0) {
    throw new Error("Customer not found");
  }
};
