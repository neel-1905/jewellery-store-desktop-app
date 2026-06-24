import { queryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { getCurrentUser, isSetupComplete } from "../lib/auth.service";

export const isSetupCompleteQueryOptions = () =>
  queryOptions({
    queryKey: QUERY_KEYS.auth.setupComplete,
    queryFn: isSetupComplete,
    staleTime: Infinity,
  });

export const getCurrentUserQueryOptions = () =>
  queryOptions({
    queryKey: QUERY_KEYS.auth.currentUser,
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });
