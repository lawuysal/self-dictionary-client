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
import NoteDetailedCardTitle from "./components/NoteDetailedCardTitle";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Sparkles } from "lucide-react";
import { useGetRandomSentenceByAI } from "./hooks/useGetRandomSentenceByAi";
import NoteProperties from "./components/NoteProperties";
import { useEffect } from "react";
import { useCreateNoteProperty } from "./hooks/useCreateNoteProperty";

export default function NoteByIdPage() {
  const { noteId } = useParams();
  const { data: note, isLoading, error } = useGetNoteById(noteId!);
  const getRandomSentenceMutation = useGetRandomSentenceByAI();
  const createNotePropertyMutation = useCreateNoteProperty(noteId!);

  function handleGenerateSentence(translationLang: string) {
    if (!note) return;

    getRandomSentenceMutation.mutate({
      word: note.name,
      translation: note.translation,
      wordLang: note.language.shadowLanguage.toUpperCase(),
      translationLang: translationLang,
    });
  }

  useEffect(() => {
    if (getRandomSentenceMutation.isSuccess) {
      createNotePropertyMutation.mutate({
        noteId: noteId!,
        name: "Sentence Example",
        value: getRandomSentenceMutation.data?.sentenceResult,
        description: getRandomSentenceMutation.data?.sentenceTranslationResult,
      });
      getRandomSentenceMutation.reset();
    }
  }, [createNotePropertyMutation, getRandomSentenceMutation, noteId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || !note) {
    return <Loader />;
  }

  return (
    <main className="mt-2 flex w-full justify-center md:mt-5 md:pl-9">
      <Card className="h-[100svh] w-[95%] md:h-[88svh] md:w-full">
        <CardHeader className="grid grid-cols-1 place-items-center justify-between gap-2 rounded-t-lg border-b bg-background p-4 dark:bg-primary/10 md:p-6 lg:grid lg:grid-cols-2">
          {/* title */}
          <NoteDetailedCardTitle note={note} />

          {/* trailing */}
          <div className="flex w-full items-center justify-end gap-2 md:px-8">
            <Button
              disabled={getRandomSentenceMutation.isPending}
              className="w-full md:w-fit"
              onClick={() => handleGenerateSentence("TURKISH")}
            >
              {getRandomSentenceMutation.isPending ? (
                <span className="mr-2 animate-spin">
                  <LoaderCircle className="size-5" />
                </span>
              ) : (
                <span className="mr-2">
                  <Sparkles className="size-5" />
                </span>
              )}{" "}
              Add a Sentence with Gemini AI
            </Button>
          </div>
        </CardHeader>

        <CardContent className="grid h-fit w-full grid-cols-1 place-items-start items-start justify-center md:grid-cols-[1fr_4fr]">
          <NoteMenu note={note} />

          <div className="mt-5 flex w-full flex-col gap-6 md:mt-12 md:px-8">
            {/* Properties */}
            <NoteProperties properties={note.properties} />
          </div>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
