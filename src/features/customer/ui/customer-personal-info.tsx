import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from "../domain/customer.types";
import DynamicLucideIcon from "@/components/common/dynamic-lucide-icon";

function CustomerPersonalInfo({ customer }: { customer: Customer }) {
  return (
    <div className="flex gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="card-title">Contact Information</CardTitle>
          <CardContent className="px-0 space-y-3 mt-2">
            <div className="flex items-center gap-2">
              <DynamicLucideIcon name="Phone" size={16} />
              <span>{customer.phone || "No phone number"}</span>
            </div>
            <div className="flex items-center gap-2">
              <DynamicLucideIcon name="Mail" size={16} />
              <span>{customer.email || "No email address"}</span>
            </div>
            <div className="flex items-center gap-2">
              <DynamicLucideIcon name="MapPin" size={16} />
              <span>{customer.address || "No address available"}</span>
            </div>
          </CardContent>
        </CardHeader>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="card-title">Notes</CardTitle>
          <CardContent className="px-0 space-y-3 mt-2">
            <p>{customer.notes || "No notes available"}</p>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

export default CustomerPersonalInfo;
