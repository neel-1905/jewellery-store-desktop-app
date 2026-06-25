import { queryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { ListParams } from "@/types/api.types";

import { getOrderById, getOrders } from "../lib/order.service";

export const getOrdersQueryOptions = (params: ListParams) =>
  queryOptions({
    queryKey: QUERY_KEYS.orders.list(params),

    queryFn: () => getOrders(params),
  });

export const getOrderByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: QUERY_KEYS.orders.detail(id),

    queryFn: () => getOrderById(id),
  });
