import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
} from "@/components/ui/select";
import {
  ArrowDownAZ,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowDownZA,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function NoteItemSortSelector() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sorting, setSorting] = useState<string>(
    `${searchParams.get("sortBy") || "name"} ${searchParams.get("order") || "asc"}`,
  );

  useEffect(() => {
    const currentSortBy = searchParams.get("sortBy") || "name";
    const currentOrder = searchParams.get("order") || "asc";
    const [sortByValue, orderValue] = sorting.split(" ");
    if (sortByValue !== currentSortBy || orderValue !== currentOrder) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("sortBy", sortByValue);
      newParams.set("order", orderValue);
      setSearchParams(newParams, { replace: true });
    }
  }, [sorting, searchParams, setSearchParams]);

  return (
    <Select value={sorting} onValueChange={setSorting}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectSeparator />
          <SelectItem value="name asc">
            <div className="flex flex-row items-center justify-center gap-2">
              <ArrowDownAZ className="size-5" />
              <p>A to Z</p>
            </div>
          </SelectItem>
          <SelectItem value="name desc">
            <div className="flex flex-row items-center justify-center gap-2">
              <ArrowDownZA className="size-5" />
              <p>Z to A</p>
            </div>
          </SelectItem>
          <SelectItem value="createdAt desc">
            <div className="flex flex-row items-center justify-center gap-2">
              <CalendarArrowUp className="size-5" />
              <p>Newest first</p>
            </div>
          </SelectItem>
          <SelectItem value="createdAt asc">
            <div className="flex flex-row items-center justify-center gap-2">
              <CalendarArrowDown className="size-5" />
              <p>Oldest first</p>
            </div>
          </SelectItem>
          <SelectItem value="intensity desc">
            <div className="flex flex-row items-center justify-center gap-2">
              <ArrowDownWideNarrow className="size-5" />
              <p>High intensity</p>
            </div>
          </SelectItem>
          <SelectItem value="intensity asc">
            <div className="flex flex-row items-center justify-center gap-2">
              <ArrowDownNarrowWide className="size-5" />
              <p>Low intensity</p>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
