import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomer } from "../lib/customer.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export function useUpdateCustomerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomer,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.customers.all,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.customers.detail(variables.customerId),
      });
    },
  });
}
