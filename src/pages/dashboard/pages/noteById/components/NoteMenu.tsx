import { NotebookPen, Trash } from "lucide-react";
import { Note } from "@/types/entities/note.entity";

export default function NoteMenu({ note }: { note: Note }) {
  return (
    <div className="mt-2 flex flex-row items-center rounded-lg border p-3 dark:bg-primary/5 md:mt-12 md:w-[20%] md:flex-col md:p-0">
      {/* Header */}
      <div className="hidden w-full items-center justify-center border-b py-2 dark:bg-primary/10 md:flex">
        <p>Note Menu</p>
      </div>
      {/* Content */}
      <div className="flex w-full flex-row items-center justify-center gap-2 md:mt-5 md:flex-col">
        {/* Add New Property */}

        {/* Edit Note */}

        {/* XXX */}
        <div className="flex w-full items-center justify-center">
          <button className="flex items-center justify-start gap-2 rounded border border-orange-500/40 bg-orange-500/10 p-2 text-sm hover:bg-orange-500/20 md:w-[85%]">
            <div className="flex size-5 items-center justify-center rounded-sm md:border md:border-orange-500/40 md:bg-orange-400/30">
              <NotebookPen className="size-5 md:size-3" />
            </div>
            <p className="hidden md:flex">Practice</p>
          </button>
        </div>

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
