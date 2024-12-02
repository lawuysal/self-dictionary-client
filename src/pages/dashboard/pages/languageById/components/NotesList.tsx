import { ScrollArea } from "@/components/ui/scroll-area";
import { Note } from "@/types/entities/note.entity";
import NoteItem from "../../allNotes/components/NoteItem";
import NotesPagination from "./NotesPagination";

export default function NotesList({
  notes,
  totalPages,
}: {
  notes: Note[];
  totalPages: number;
}) {
  return (
    <div className="flex flex-col">
      <ScrollArea className="h-[50svh] w-full rounded-lg md:h-[65svh]">
        <div className="mx-auto mt-5 grid w-full grid-cols-1 place-items-center items-center justify-center gap-4 md:mt-12 md:w-[90%] md:grid-cols-2">
          {notes.map((note, index) => (
            <NoteItem key={index} note={note} />
          ))}
        </div>
      </ScrollArea>

      <NotesPagination totalPages={totalPages} />
    </div>
  );
}
