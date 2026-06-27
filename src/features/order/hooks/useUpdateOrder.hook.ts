import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { OrderFormData } from "../domain/order.validations";

import { updateOrder } from "../lib/order.service";

type UpdateOrderMutationParams = {
  id: number;
  data: OrderFormData;
};

export function useUpdateOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateOrderMutationParams) =>
      updateOrder(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.orders.all,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.orders.detail(variables.id),
      });
    },
  });
}
