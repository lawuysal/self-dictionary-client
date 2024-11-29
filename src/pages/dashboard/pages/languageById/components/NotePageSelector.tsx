import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectSeparator,
  SelectLabel,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function NotePageSelector({
  totalPages,
}: {
  totalPages: number;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<string>(searchParams.get("page") || "1");

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    setSearchParams(newParams);
  }, [page, searchParams, setSearchParams]);

  return (
    <Select onValueChange={setPage} value={page}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pages</SelectLabel>
          <SelectSeparator />
          {[...Array(totalPages)].map((_, index) => (
            <SelectItem
              key={index + "notesPageSelectorItem"}
              value={`${index + 1}`}
            >
              Page: {index + 1}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
