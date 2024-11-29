import { NotebookPen, Trash } from "lucide-react";
import NoteAddingDialog from "./NoteAddingDialog";
import LanguageEditingDialog from "./LanguageEditingDialog";
import { Language } from "@/types/entities/language.entity";

export default function LanguageMenu({ language }: { language: Language }) {
  return (
    <div className="mt-2 flex h-fit flex-row items-center rounded-lg border p-3 dark:bg-primary/5 md:mt-12 md:h-[55svh] md:w-[90%] md:flex-col md:p-0">
      {/* Header */}
      <div className="hidden w-full items-center justify-center border-b py-2 dark:bg-primary/10 md:flex">
        <p>Language Menu</p>
      </div>
      {/* Content */}
      <div className="flex w-full flex-row items-center justify-center gap-2 md:mt-5 md:flex-col">
        {/* Add New Note */}
        <NoteAddingDialog languageId={language.id} />

        {/* Edit Language */}
        <LanguageEditingDialog language={language} />

        {/* Practice Language */}
        <div className="flex w-full items-center justify-center">
          <button className="flex items-center justify-start gap-2 rounded border border-orange-500/40 bg-orange-500/10 p-2 text-sm hover:bg-orange-500/20 md:w-[85%]">
            <div className="flex size-5 items-center justify-center rounded-sm md:border md:border-orange-500/40 md:bg-orange-400/30">
              <NotebookPen className="size-5 md:size-3" />
            </div>
            <p className="hidden md:flex">Practice</p>
          </button>
        </div>

        {/* Delete Language */}
        <div className="flex w-full items-center justify-center">
          <button className="flex items-center justify-start gap-2 rounded border border-red-500/40 bg-red-500/10 p-2 text-sm hover:bg-red-500/20 md:w-[85%]">
            <div className="flex size-5 items-center justify-center rounded-sm md:border md:border-red-500/40 md:bg-red-400/30">
              <Trash className="size-5 md:size-3" />
            </div>
            <p className="hidden md:flex">Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
}
