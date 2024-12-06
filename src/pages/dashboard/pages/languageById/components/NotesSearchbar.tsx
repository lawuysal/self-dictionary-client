import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function NotesSearchbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (debouncedSearch !== currentSearch) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("search", debouncedSearch);
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          placeholder="Start typing..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-2 top-3" size={16} />
      </div>
    </div>
  );
}
