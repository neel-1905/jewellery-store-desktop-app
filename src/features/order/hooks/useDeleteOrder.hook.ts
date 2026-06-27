import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder } from "../lib/order.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export function useDeleteOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.orders.all,
      });
    },
  });
}
