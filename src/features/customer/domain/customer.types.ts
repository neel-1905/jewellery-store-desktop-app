import { ListParams, PaginatedResponse } from "@/types/api.types";

export type DBCustomer = {
  id: number;
  customer_code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  created_by: number;
  created_at: string;
  updated_at: string;
};

export type Customer = {
  id: number;
  customerCode: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
};

export type GetCustomersParams = ListParams;

export type CustomerListResponse = PaginatedResponse<Customer>;

export type CustomerOption = {
  id: number;
  customerCode: string;
  name: string;
};

export type SearchCustomersParams = {
  search: string;
  page: number;
  pageSize: number;
};
