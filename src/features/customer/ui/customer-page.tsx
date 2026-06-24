import { useQuery } from "@tanstack/react-query";

import { getCustomersQueryOptions } from "../lib/customer.query-options";
import CustomerFormDialog from "./form/customer-form-dialog";

function CustomerPage() {
  const { data } = useQuery(
    getCustomersQueryOptions({ page: 1, pageSize: 10 }),
  );

  console.log(data);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CustomerFormDialog mode="create" />
      </div>
    </div>
  );
}

export default CustomerPage;
