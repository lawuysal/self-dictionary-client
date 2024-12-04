import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function NotesPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPage, setSelectedPage] = useState(
    Number(searchParams.get("page") || 1),
  );

  function handleNext() {
    if (selectedPage === totalPages) {
      return;
    } else {
      setSelectedPage((prev) => ++prev);
    }
  }

  function handlePrevious() {
    if (selectedPage <= 1) {
      return;
    } else {
      setSelectedPage((prev) => --prev);
    }
  }

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", `${selectedPage}`);
    setSearchParams(newParams);
  }, [searchParams, selectedPage, setSearchParams]);

  if (totalPages === 0) {
    return <div></div>;
  }

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={handlePrevious}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem
            key={index + "notesPageSelectorItem"}
            value={`${index + 1}`}
          >
            <PaginationLink
              isActive={index + 1 === selectedPage ? true : false}
              className="cursor-pointer"
              onClick={() => setSelectedPage(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
