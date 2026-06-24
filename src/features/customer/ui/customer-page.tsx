import { useQuery } from "@tanstack/react-query";

import { getCustomersQueryOptions } from "../lib/customer.query-options";

function CustomerPage() {
  const { data } = useQuery(
    getCustomersQueryOptions({ page: 1, pageSize: 10 }),
  );

  return <div>CustomerPage</div>;
}

export default CustomerPage;
