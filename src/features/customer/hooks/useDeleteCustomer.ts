import { QUERY_KEYS } from "@/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer } from "../lib/customer.service";

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.customers.all,
      });
    },
  });
};
