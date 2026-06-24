import { getDb } from "@/db/database";
import { DBCustomer, GetCustomersParams } from "../domain/customer.types";

import { CustomerListResponse } from "../domain/customer.types";
import { mapDBCustomerToCustomer } from "./customer.mapper";

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

// export const addCustomer = async (customer: Customer) => {
//   const db = await getDb();

//   const result = await db.execute(
//     `
//       INSERT INTO customers (
//         name,
//         phone,
//         email,
//         address,
//         created_at,
//         updated_at
//       ) VALUES (?, ?, ?, ?, ?, ?)
//     `,
//     [
//       customer.name,
//       customer.phone,
//       customer.email,
//       customer.address,
//       new Date().toISOString(),
//       new Date().toISOString(),
//     ],
//   );

//   return result;
// };
