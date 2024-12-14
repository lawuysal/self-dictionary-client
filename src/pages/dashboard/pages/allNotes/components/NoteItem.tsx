import { Note } from "@/types/entities/note.entity";
import IntensityBar from "./IntensityBar";
import { NavLink } from "react-router-dom";
import ROUTES from "@/routes/Routes.enum";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function NoteItem({ note }: { note: Note }) {
  const { currentPath } = useSelector((state: RootState) => state.navigation);

  return (
    <NavLink
      to={ROUTES.NOTE_BY_ID_GEN(note.languageId, note.id, currentPath)}
      className="group flex w-[90%] flex-col gap-1 rounded-lg border bg-background p-4 shadow-md transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-muted/40 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <p className="font-medium">
          {note.name}
          <span className="ml-3 text-sm font-normal opacity-50">
            {note.translation}
          </span>
        </p>
        <span className="text-sm text-muted-foreground transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
          {note.intensity}/100
        </span>
      </div>

      <IntensityBar intensity={note.intensity} />
    </NavLink>
  );
}
