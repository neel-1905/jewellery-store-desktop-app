import { ListParams } from "@/types/api.types";

export const QUERY_KEYS = {
  auth: {
    setupComplete: ["auth", "setup-complete"],
    currentUser: ["auth", "current-user"],
  },
  customers: {
    all: ["customers"],

    list: (page: number, pageSize: number) => ["customers", page, pageSize],

    detail: (customerId: number) => ["customers", "detail", customerId],
  },
  orders: {
    all: ["orders"] as const,

    list: (params: ListParams) =>
      [...QUERY_KEYS.orders.all, "list", params] as const,

    detail: (id: number) => [...QUERY_KEYS.orders.all, "detail", id] as const,
  },
} as const;
