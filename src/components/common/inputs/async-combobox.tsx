import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useState } from "react";

type AsyncComboboxProps<T> = {
  value?: number;

  items: T[];

  selectedItem?: T;

  loading?: boolean;
  loadingMore?: boolean;
  hasNextPage?: boolean;

  search: string;

  getId(item: T): number;

  getLabel(item: T): string;

  getDescription?(item: T): string | undefined;

  onSearchChange(search: string): void;

  onValueChange(id: number): void;

  onLoadMore(): void;
};

export default function AsyncCombobox<T>({
  value,
  items,
  selectedItem,
  loading,
  loadingMore,
  hasNextPage,
  search,
  onSearchChange,
  onValueChange,
  onLoadMore,
  getId,
  getLabel,
  getDescription,
}: AsyncComboboxProps<T>) {
  const [open, setOpen] = useState(false);

  const loadMoreRef = useIntersectionObserver(() => {
    if (!loadingMore && hasNextPage) {
      onLoadMore();
    }
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedItem ? getLabel(selectedItem) : "Select..."}

          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-87.5 p-0">
        <Command shouldFilter={false}>
          <CommandInput
            value={search}
            onValueChange={onSearchChange}
            placeholder="Search..."
          />

          <CommandList className="max-h-72">
            <CommandEmpty>No results.</CommandEmpty>

            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={getId(item)}
                  value={getLabel(item)}
                  onSelect={() => {
                    onValueChange(getId(item));

                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === getId(item) ? "opacity-100" : "opacity-0",
                    )}
                  />

                  <div>
                    <p>{getLabel(item)}</p>

                    {getDescription?.(item) && (
                      <p className="text-xs text-muted-foreground">
                        {getDescription(item)}
                      </p>
                    )}
                  </div>
                </CommandItem>
              ))}

              {loading && (
                <div className="flex justify-center py-4">
                  <Loader2 className="size-4 animate-spin" />
                </div>
              )}

              {hasNextPage && (
                <div ref={loadMoreRef} className="flex justify-center py-4">
                  {loadingMore && <Loader2 className="size-4 animate-spin" />}
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
