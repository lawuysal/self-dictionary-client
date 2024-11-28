import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import NoteItem from "../allNotes/components/NoteItem";
import { useGetLanguageById } from "./hooks/useGetLanguageById";
import Loader from "@/components/Loader";
import { useGetNotesByLanguageId } from "./hooks/useGetNotesByLanguageId";
import LanguageMenu from "./components/LanguageMenu";
import { useEffect, useState } from "react";
import NotePageSelector from "./components/NotePageSelector";

export default function LanguageByIdPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<string>(searchParams.get("page") || "1");
  const {
    data: language,
    isError: languageIsError,
    isLoading: languageIsLoading,
  } = useGetLanguageById(id as string);
  const {
    data: notesData,
    isError: notesIsError,
    isLoading: notesIsLoading,
    error: notesError,
  } = useGetNotesByLanguageId(
    id as string,
    Number(searchParams.get("limit") || 10),
    Number(page),
  );

  useEffect(() => {
    if (notesError?.status === 404) {
      navigate("/404", { replace: true });
    }
  }, [navigate, notesError?.status]);

  if (languageIsError || notesIsError) {
    return <div>{notesError?.status}</div>;
  }

  if (languageIsLoading || notesIsLoading || !language || !notesData) {
    return <Loader />;
  }

  return (
    <main className="mt-5 flex w-full justify-center">
      <Card className="h-fit w-[90%]">
        <CardHeader className="grid grid-cols-1 place-items-center gap-2 rounded-t-lg border-b bg-background p-4 dark:bg-primary/10 md:p-6 lg:grid lg:grid-cols-3 lg:grid-rows-1">
          <div className="flex w-full flex-row items-center justify-between gap-2 justify-self-start md:w-fit md:flex-col md:items-start">
            <CardTitle>Language: {language.name}</CardTitle>
            <CardDescription>
              <p>{notesData.meta.total} note(s) found.</p>
            </CardDescription>
          </div>

          <div className="w-full md:w-full">
            <div className="relative">
              <Input className="pl-10" />
              <Search className="top- absolute left-2 top-3" size={16} />
            </div>
          </div>

          <div className="flex w-full items-center justify-center">
            <NotePageSelector
              totalPages={notesData.meta.totalPages}
              page={page}
              setPage={setPage}
            />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row">
          <LanguageMenu language={language} />

          <ScrollArea className="h-[55svh] w-full rounded-lg md:h-[65svh]">
            <div className="mx-auto mt-5 grid w-full grid-cols-1 place-items-center items-center justify-center gap-4 md:mt-12 md:w-[90%] md:grid-cols-2">
              {notesData.notes.map((note, index) => (
                <NoteItem key={index} note={note} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
