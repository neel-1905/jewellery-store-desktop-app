import { useMemo, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import AsyncCombobox from "@/components/common/inputs/async-combobox";

import {
  getCustomerByIdQueryOptions,
  searchCustomersInfiniteQueryOptions,
} from "@/features/customer/lib/customer.query-options";
import { useDebounce } from "@/hooks/use-debounce";

type CustomerComboboxProps = {
  value?: number;
  onValueChange: (id: number) => void;
};

export default function CustomerCombobox({
  value,
  onValueChange,
}: CustomerComboboxProps) {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(searchCustomersInfiniteQueryOptions(debouncedSearch));

  const { data: selectedCustomer } = useQuery({
    ...getCustomerByIdQueryOptions(value ?? 0),
    enabled: !!value,
  });

  const customers = useMemo(() => {
    const list = data?.pages.flatMap((page) => page.items) ?? [];

    if (
      selectedCustomer &&
      !list.some((customer) => customer.id === selectedCustomer.id)
    ) {
      return [selectedCustomer, ...list];
    }

    return list;
  }, [data, selectedCustomer]);

  return (
    <AsyncCombobox
      value={value}
      items={customers}
      selectedItem={selectedCustomer}
      loading={isFetching}
      loadingMore={isFetchingNextPage}
      hasNextPage={hasNextPage}
      search={search}
      onSearchChange={setSearch}
      onLoadMore={() => fetchNextPage()}
      onValueChange={onValueChange}
      getId={(customer) => customer.id}
      getLabel={(customer) => customer.name}
      getDescription={(customer) => customer.customerCode}
    />
  );
}
