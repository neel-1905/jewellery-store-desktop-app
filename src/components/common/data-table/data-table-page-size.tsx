import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DataTablePageSizeProps = {
  pageSize: number;

  onPageSizeChange: (pageSize: number) => void;
};

export function DataTablePageSize({
  pageSize,
  onPageSizeChange,
}: DataTablePageSizeProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Rows</span>

      <Select
        value={String(pageSize)}
        onValueChange={(value) => onPageSizeChange(Number(value))}
      >
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="10">10</SelectItem>

          <SelectItem value="20">20</SelectItem>

          <SelectItem value="50">50</SelectItem>

          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
