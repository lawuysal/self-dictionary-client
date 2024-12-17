import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useGetNoteById } from "./hooks/useGetNoteById";
import Loader from "@/components/Loader";
import NoteMenu from "./components/NoteMenu";
import NoteProperties from "./components/NoteProperties";
import NoteDetailedCardTitle from "./components/NoteDetailedCardTitle";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function NoteByIdPage() {
  const { noteId } = useParams();
  const { data: note, isLoading, error } = useGetNoteById(noteId!);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || !note) {
    return <Loader />;
  }

  return (
    <main className="mt-2 flex w-full justify-center md:mt-5 md:pl-9">
      <Card className="h-[100svh] w-[95%] md:h-[88svh] md:w-full">
        <CardHeader className="grid grid-cols-1 place-items-center justify-between gap-2 rounded-t-lg border-b bg-background p-4 dark:bg-primary/10 md:p-6 lg:grid lg:grid-cols-1">
          {/* title */}
          <NoteDetailedCardTitle note={note} />

          {/* trailing */}
          <div className="flex w-full items-center justify-end gap-2 md:px-8">
            <Button className="w-full">
              <span className="mr-2">
                <Sparkles className="size-5" />
              </span>{" "}
              Add a Sentence with Gemini AI
            </Button>
          </div>
        </CardHeader>

        <CardContent className="grid h-fit w-full grid-cols-1 place-items-start items-start justify-center md:grid-cols-[1fr_4fr]">
          <NoteMenu note={note} />

          <div className="mt-5 flex w-full flex-col gap-6 md:mt-12 md:px-8">
            {/* Properties */}
            <NoteProperties properties={JSON.parse(note.properties)} />
          </div>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
