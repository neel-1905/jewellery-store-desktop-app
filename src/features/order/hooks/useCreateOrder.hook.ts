import { QUERY_KEYS } from "@/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../lib/order.service";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.orders.all,
      });
    },
  });
};
