import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createInitialSetup } from "../lib/auth.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useCreateInitialSetup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createInitialSetup,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: QUERY_KEYS.auth.setupComplete,
      });
      navigate("/login");
    },
    onError: (error) => {
      console.error("Setup failed: " + error);
    },
  });
};
