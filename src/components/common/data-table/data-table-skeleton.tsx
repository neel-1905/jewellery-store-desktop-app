import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableSkeletonProps = {
  rows?: number;
  columns?: number;
};

export function DataTableSkeleton({
  rows = 10,
  columns = 6,
}: DataTableSkeletonProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton className="h-4 w-24" />
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, columnIndex) => (
                <TableCell key={columnIndex}>
                  <Skeleton className="h-4 w-full max-w-40" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
