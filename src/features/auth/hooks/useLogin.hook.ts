import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/auth.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import { setSession } from "../lib/session";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: async (user) => {
      await queryClient.refetchQueries({
        queryKey: QUERY_KEYS.auth.currentUser,
      });
      setSession(user.userId);
      navigate("/");
    },
    onError: (error) => {
      console.error("Setup failed: " + error);
    },
  });
};
