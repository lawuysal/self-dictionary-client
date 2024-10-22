import { Note } from "../types/note.entity";
import IntensityBar from "./IntensityBar";

export default function NoteItem({ note }: { note: Note }) {
  return (
    <div className="flex w-[90%] flex-col gap-3 rounded-lg border bg-background p-4 shadow-md transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-muted/40 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">{note.text}</p>
        <span className="text-sm text-muted-foreground">
          {note.intensity}/100
        </span>
      </div>
      <IntensityBar intensity={note.intensity} />
    </div>
  );
}
