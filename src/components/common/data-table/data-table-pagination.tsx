import { Button } from "@/components/ui/button";

type DataTablePaginationProps = {
  page: number;

  pageSize: number;

  totalCount: number;

  onPageChange: (page: number) => void;
};

export function DataTablePagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
}: DataTablePaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
