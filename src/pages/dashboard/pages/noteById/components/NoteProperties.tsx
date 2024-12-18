import { ScrollArea } from "@/components/ui/scroll-area";
import { NoteProperty } from "@/types/entities/noteProperty.entity";
import NotePropertyEditingDialog from "./NotePropertyEditingDialog";

export default function NoteProperties({
  properties,
}: {
  properties: NoteProperty[];
}) {
  if (!properties || properties.length === 0) {
    return (
      <div className="flex w-full items-center justify-center gap-2 rounded-lg border p-4 dark:bg-primary/10">
        <p className="text-primary">No properties to show</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor="note-properties-field">
        <h3 className="font-semibold">Properties ( {properties.length} )</h3>
      </label>
      <ScrollArea className="flex h-full max-h-[65svh] w-full flex-col overflow-y-auto md:max-h-[55svh]">
        <div className="mx-auto grid w-full grid-cols-1 place-items-center gap-3 md:grid-cols-2 lg:grid-cols-2">
          {properties.map((prop, index) => (
            <NotePropertyEditingDialog
              key={index}
              notePropertyId={prop.id}
              noteId={prop.noteId}
              name={prop.name}
              value={prop.value}
              description={prop.description}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
