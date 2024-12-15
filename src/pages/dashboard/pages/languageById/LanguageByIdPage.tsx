import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { useGetLanguageById } from "./hooks/useGetLanguageById";
import Loader from "@/components/Loader";
import { useGetNotesByLanguageId } from "./hooks/useGetNotesByLanguageId";
import LanguageMenu from "./components/LanguageMenu";
import NotesList from "./components/NotesList";
import NoteItemSortSelector from "./components/NoteItemSortSelector";
import { Button } from "@/components/ui/button";
import ROUTES from "@/routes/Routes.enum";
import NotesSearchbar from "./components/NotesSearchbar";

export default function LanguageByIdPage() {
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
    searchParams.get("search") || "",
  );

  if (languageIsError || notesIsError) {
    return <div>{notesError?.status}</div>;
  }

  if (languageIsLoading || !language) {
    return <Loader />;
  }

  return (
    <main className="mt-2 flex w-full justify-center overflow-hidden md:mt-5 md:pl-9">
      <Card className="h-[90svh] w-[95%] md:h-[88svh] md:w-full">
        <CardHeader className="grid grid-cols-1 place-items-center gap-2 rounded-t-lg border-b bg-background p-4 dark:bg-primary/10 md:p-6 lg:grid lg:grid-cols-3 lg:grid-rows-1">
          {/* title */}
          <div className="flex h-full w-full flex-row items-center justify-start gap-2 justify-self-start md:w-fit md:flex-row md:items-center">
            <div className="h-full">
              <NavLink to={ROUTES.MY_LANGUAGES}>
                <Button size="icon" variant="ghost" className="h-full">
                  <ArrowLeft className="size-6" />
                </Button>
              </NavLink>
            </div>

            <div className="flex flex-col items-start justify-center">
              <CardTitle className="text-xl md:text-2xl">
                Language: {language.name} ({notesData?.meta.totalCount})
              </CardTitle>
              <CardDescription>
                {notesData ? notesData.meta.total : 0} note(s) shown.
              </CardDescription>
            </div>
          </div>

          {/* <NotesSearchbar /> */}
          <div className="hidden md:flex"></div>

          {/* trailing */}
          <div className="flex w-full items-center justify-center gap-2 md:px-8">
            <NotesSearchbar />
            <NoteItemSortSelector />
          </div>
        </CardHeader>

        <CardContent className="grid h-fit grid-cols-1 md:grid-cols-[1fr_4fr]">
          <LanguageMenu language={language} />

          {notesData ? (
            <NotesList
              notes={notesData.notes}
              totalPages={notesData.meta.totalPages}
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
