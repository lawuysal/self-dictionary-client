import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function NotePageSelector({
  totalPages,
  page,
  setPage,
}: {
  totalPages: number;
  page: string;
  setPage: (page: string) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    setSearchParams(newParams);
  }, [page, searchParams, setSearchParams]);

  return (
    <Select defaultValue={page} onValueChange={setPage}>
      <SelectTrigger className="w-[30%]">
        <SelectValue placeholder="Select Page" />
      </SelectTrigger>
      <SelectContent>
        {[...Array(totalPages)].map((_, index) => (
          <SelectItem
            key={index + "notesPageSelectorItem"}
            value={`${index + 1}`}
          >
            Page: {index + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
