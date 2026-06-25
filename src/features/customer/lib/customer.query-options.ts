import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import {
  getCustomerById,
  getCustomers,
  searchCustomers,
} from "../lib/customer.service";
import { PaginationParams } from "@/types/api.types";

export const getCustomersQueryOptions = (params: PaginationParams) =>
  queryOptions({
    queryKey: QUERY_KEYS.customers.list(params.page, params.pageSize),

    queryFn: () => getCustomers(params),
  });

export const getCustomerByIdQueryOptions = (customerId: number) =>
  queryOptions({
    queryKey: QUERY_KEYS.customers.detail(customerId),

    queryFn: () => getCustomerById(customerId),
  });

export const searchCustomersInfiniteQueryOptions = (search: string) =>
  infiniteQueryOptions({
    queryKey: QUERY_KEYS.customers.search(search),

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      searchCustomers({
        search,
        page: pageParam,
        pageSize: 20,
      }),

    getNextPageParam: (lastPage) => {
      const loaded = lastPage.page * lastPage.pageSize;

      if (loaded >= lastPage.totalCount) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
