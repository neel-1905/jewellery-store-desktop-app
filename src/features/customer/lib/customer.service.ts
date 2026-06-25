import { getDb } from "@/db/database";
import {
  Customer,
  CustomerOption,
  DBCustomer,
  GetCustomersParams,
  SearchCustomersParams,
} from "../domain/customer.types";

import { CustomerListResponse } from "../domain/customer.types";
import { mapDBCustomerToCustomer } from "./customer.mapper";
import { CustomerFormInput } from "../domain/customer.validations";
import { requireUser } from "@/features/auth/lib/auth.util";
import { generateCustomerCode } from "./customer.util";
import { PaginatedResponse } from "@/types/api.types";

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

export async function searchCustomers(
  params: SearchCustomersParams,
): Promise<PaginatedResponse<CustomerOption>> {
  await requireUser();

  const db = await getDb();

  const { search, page, pageSize } = params;

  const searchTerm = `%${search}%`;

  const [{ count }] = await db.select<{ count: number }[]>(
    `
      SELECT COUNT(*) as count
      FROM customers
      WHERE
        name LIKE ?
        OR customer_code LIKE ?
    `,
    [searchTerm, searchTerm],
  );

  const items = await db.select<
    {
      id: number;
      customer_code: string;
      name: string;
    }[]
  >(
    `
      SELECT
        id,
        customer_code,
        name
      FROM customers
      WHERE
        name LIKE ?
        OR customer_code LIKE ?
      ORDER BY name
      LIMIT ?
      OFFSET ?
    `,
    [searchTerm, searchTerm, pageSize, (page - 1) * pageSize],
  );

  return {
    items: items.map((customer) => ({
      id: customer.id,
      customerCode: customer.customer_code,
      name: customer.name,
    })),
    totalCount: count,
    page,
    pageSize,
  };
}
