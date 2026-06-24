import { queryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { getCustomers } from "../lib/customer.service";
import { PaginationParams } from "@/types/api.types";

export const getCustomersQueryOptions = (params: PaginationParams) =>
  queryOptions({
    queryKey: QUERY_KEYS.customers.list(params.page, params.pageSize),

    queryFn: () => getCustomers(params),
  });
