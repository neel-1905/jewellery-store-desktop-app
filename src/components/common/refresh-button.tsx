// components/common/refresh-button.tsx
import { Button } from "@/components/ui/button";
import DynamicLucideIcon from "@/components/common/dynamic-lucide-icon";
import { QueryKey, useQueryClient } from "@tanstack/react-query";

function RefreshButton({ queryKey }: { queryKey: QueryKey }) {
  const queryClient = useQueryClient();

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={() => queryClient.invalidateQueries({ queryKey })}
    >
      <DynamicLucideIcon name="RefreshCw" size={14} />
    </Button>
  );
}

export default RefreshButton;
