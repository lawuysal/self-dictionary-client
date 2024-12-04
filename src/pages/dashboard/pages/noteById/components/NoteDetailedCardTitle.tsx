import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import ROUTES from "@/routes/Routes.enum";
import { Note } from "@/types/entities/note.entity";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NoteDetailedCardTitle({ note }: { note: Note }) {
  return (
    <div className="flex h-full w-full flex-row items-center gap-2 justify-self-start md:w-fit md:flex-row md:items-center">
      <div className="h-full">
        <NavLink className="" to={ROUTES.LANGUAGE_BY_ID_GEN(note.languageId)}>
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
    </div>
  );
}
