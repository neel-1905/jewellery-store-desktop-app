import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { ListParams } from "@/types/api.types";

import { getOrders } from "../lib/order.service";
import { searchCustomers } from "@/features/customer/lib/customer.service";

export const getOrdersQueryOptions = (params: ListParams) =>
  queryOptions({
    queryKey: QUERY_KEYS.orders.list(params),

    queryFn: () => getOrders(params),
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
