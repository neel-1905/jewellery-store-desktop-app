import { useState } from "react";

import { ListParams, SortDirection } from "@/types/api.types";

export function useTableState(initialState?: Partial<ListParams>) {
  const [params, setParams] = useState<ListParams>({
    page: 1,
    pageSize: 10,
    search: "",
    sortBy: "created_at",
    sortDirection: "desc",

    ...initialState,
  });

  const setPage = (page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  };

  const setPageSize = (pageSize: number) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      pageSize,
    }));
  };

  const setSearch = (search: string) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      search,
    }));
  };

  const setSorting = (sortBy: string, sortDirection: SortDirection) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      sortBy,
      sortDirection,
    }));
  };

  return {
    params,

    setPage,
    setPageSize,
    setSearch,
    setSorting,
  };
}
