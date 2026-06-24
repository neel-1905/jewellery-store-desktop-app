import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
};

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-border bg-muted/50 hover:bg-muted/50"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-11 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <TableRow
                key={row.id}
                className={
                  i % 2 === 0
                    ? "border-b border-border/50 transition-colors hover:bg-muted/40"
                    : "border-b border-border/50 bg-muted/20 transition-colors hover:bg-muted/40"
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-3 text-sm text-foreground"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-32 text-center">
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm font-medium text-foreground">
                    No results
                  </p>
                  <p className="text-xs text-muted-foreground">
                    No records found to display
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
