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
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function NoteItemSortSelector() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sorting, setSorting] = useState<string>(
    `${searchParams.get("sortBy") || "name"} ${searchParams.get("order") || "asc"}`,
  );

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    const [sortByValue, orderValue] = sorting.split(" ");
    newParams.set("sortBy", sortByValue);
    newParams.set("order", orderValue);
    setSearchParams(newParams);
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
          <SelectItem value="name asc">A to Z</SelectItem>
          <SelectItem value="name desc">Z to A</SelectItem>
          <SelectItem value="createdAt desc">Newest first</SelectItem>
          <SelectItem value="createdAt asc">Oldest first</SelectItem>
          <SelectItem value="intensity desc">High intensity</SelectItem>
          <SelectItem value="intensity asc">Low intensity</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
