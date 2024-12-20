import { Trash } from "lucide-react";
import { Note } from "@/types/entities/note.entity";
import NoteUpdatingDialog from "./NoteUpdatingDialog";
import NotePropertyAddingDialog from "./NotePropertyAddingDialog";

export default function NoteMenu({ note }: { note: Note }) {
  return (
    <div className="mt-2 flex h-fit w-full flex-row items-center rounded-lg border p-3 dark:bg-primary/5 md:mt-12 md:h-[55svh] md:w-[90%] md:flex-col md:p-0">
      {/* Header */}
      <div className="hidden w-full items-center justify-center border-b p-2 dark:bg-primary/10 md:flex">
        <p className="text-wrap">Note Menu</p>
      </div>
      {/* Content */}
      <div className="flex w-full flex-row items-center justify-center gap-2 md:mt-5 md:flex-col">
        {/* Add New Property */}
        <NotePropertyAddingDialog noteId={note.id} />

        {/* Edit Note */}
        <NoteUpdatingDialog note={note} />

        {/* Delete Note */}
        <div className="flex w-full items-center justify-center">
          <button className="flex items-center justify-start gap-2 rounded border border-red-500/40 bg-red-500/10 p-2 text-sm hover:bg-red-500/20 md:w-[85%]">
            <div className="flex size-5 items-center justify-center rounded-sm md:border md:border-red-500/40 md:bg-red-400/30">
              <Trash className="size-5 md:size-3" />
            </div>
            <p className="hidden md:flex">Delete Note</p>
          </button>
        </div>
      </div>
    </div>
  );
}
