export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type SortDirection = "asc" | "desc";

export type SortingParams = {
  sortBy?: string;
  sortDirection?: SortDirection;
};

export type SearchParams = {
  search?: string;
};

export type ListParams = PaginationParams & SortingParams & SearchParams;

export type PaginatedResponse<T> = {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
};
