import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ROUTES from "@/routes/Routes.enum";
import { Note } from "@/types/entities/note.entity";
import { ArrowLeft } from "lucide-react";
import { NavLink, useSearchParams } from "react-router-dom";
import TTSPlayer from "./TTSPlayer";

export default function NoteDetailedCardTitle({ note }: { note: Note }) {
  const [searchParams] = useSearchParams();
  return (
    <div className="flex h-full w-full flex-row items-center justify-between gap-2">
      <div className="flex items-center justify-start gap-2">
        <div className="h-full">
          <NavLink
            className=""
            to={
              searchParams.get("origin") ||
              ROUTES.LANGUAGE_BY_ID_GEN(note.languageId)
            }
          >
            <Button size="icon" variant="ghost" className="h-full">
              <ArrowLeft className="size-6" />
            </Button>
          </NavLink>
        </div>

        <div className="flex flex-col items-start justify-center">
          <CardTitle className="text-xl md:text-2xl">{note.name}</CardTitle>
          <CardDescription>Translation: {note.translation}</CardDescription>
          <div className="text-wrap">
            <CardDescription>
              {note.description && `Description: ${note.description}`}
            </CardDescription>
          </div>
        </div>
        <div
          className={cn(
            "ml-5 cursor-pointer",
            !note.language.shadowLanguage ? "hidden" : "",
          )}
        >
          <TTSPlayer text={note.name} language={note.language.shadowLanguage} />
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}
