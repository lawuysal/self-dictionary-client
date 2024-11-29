import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetLanguageById } from "./hooks/useGetLanguageById";
import Loader from "@/components/Loader";
import { useGetNotesByLanguageId } from "./hooks/useGetNotesByLanguageId";
import LanguageMenu from "./components/LanguageMenu";
import { useEffect } from "react";
import NotePageSelector from "./components/NotePageSelector";
import NotesList from "./components/NotesList";
import NoteItemSortSelector from "./components/NoteItemSortSelector";

export default function LanguageByIdPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const {
    data: language,
    isError: languageIsError,
    isLoading: languageIsLoading,
  } = useGetLanguageById(id as string);
  const {
    data: notesData,
    isError: notesIsError,
    error: notesError,
  } = useGetNotesByLanguageId(
    id as string,
    Number(searchParams.get("limit") || 10),
    Number(searchParams.get("page") || 1),
    searchParams.get("sortBy") || "name",
    searchParams.get("order") || "asc",
  );

  useEffect(() => {
    if (notesError?.status === 404) {
      navigate("/404", { replace: true });
    }
  }, [navigate, notesError?.status]);

  if (languageIsError || notesIsError) {
    return <div>{notesError?.status}</div>;
  }

  if (languageIsLoading || !language) {
    return <Loader />;
  }

  return (
    <main className="mt-5 flex w-full justify-center">
      <Card className="h-[88svh] w-[90%] md:h-[85svh]">
        <CardHeader className="grid grid-cols-1 place-items-center gap-2 rounded-t-lg border-b bg-background p-4 dark:bg-primary/10 md:p-6 lg:grid lg:grid-cols-3 lg:grid-rows-1">
          <div className="flex w-full flex-row items-center justify-between gap-2 justify-self-start md:w-fit md:flex-col md:items-start">
            <CardTitle className="text-xl md:text-2xl">
              Language: {language.name}
            </CardTitle>
            <CardDescription>
              <p>{notesData ? notesData.meta.total : 0} note(s) found.</p>
            </CardDescription>
          </div>

          <div className="w-full md:w-full">
            <div className="relative">
              <Input className="pl-10" />
              <Search className="top- absolute left-2 top-3" size={16} />
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-2">
            <NotePageSelector
              totalPages={notesData ? notesData.meta.totalPages : 0}
            />
            <NoteItemSortSelector />
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-[1fr_4fr]">
          <LanguageMenu language={language} />

          {notesData ? <NotesList notes={notesData.notes} /> : <p></p>}
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
