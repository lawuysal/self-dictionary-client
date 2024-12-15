import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllNotesByUserId } from "./hooks/useGetAllNotesByUserId";
import NoteItemSortSelector from "../languageById/components/NoteItemSortSelector";
import { useSearchParams } from "react-router-dom";
import NotesSearchbar from "../languageById/components/NotesSearchbar";
import NotesList from "../languageById/components/NotesList";

export default function AllNotesPage() {
  const [searchParams] = useSearchParams();
  const { data: notesData, error } = useGetAllNotesByUserId(
    localStorage.getItem("userId") || "",
    Number(searchParams.get("limit") || 10),
    Number(searchParams.get("page") || 1),
    searchParams.get("sortBy") || "name",
    searchParams.get("order") || "asc",
    searchParams.get("search") || "",
  );

  if (error) {
    return <div>Error</div>;
  }

  return (
    <main className="mt-2 flex w-full justify-center md:mt-5 md:pl-9">
      <Card className="h-[90svh] w-[95%] md:h-[88svh] md:w-full">
        <CardHeader className="grid grid-cols-1 place-items-center gap-2 rounded-t-lg border-b bg-background p-4 dark:bg-primary/10 md:p-6 lg:grid lg:grid-cols-2 lg:grid-rows-1">
          <div className="flex flex-col gap-2 justify-self-start">
            <CardTitle>All notes ({notesData?.meta.totalCount})</CardTitle>
            <CardDescription>
              {notesData ? notesData.meta.total : 0} note(s) shown.
            </CardDescription>
          </div>

          {/* Trailing */}
          <div className="flex w-full items-center justify-center gap-2 md:px-8">
            <NotesSearchbar />
            <NoteItemSortSelector />
          </div>
        </CardHeader>
        <CardContent>
          {notesData ? (
            <NotesList
              notes={notesData.notes}
              totalPages={notesData.meta.totalPages}
              className="h-[60svh]"
            />
          ) : (
            <p></p>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
