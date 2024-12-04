import { ScrollArea } from "@/components/ui/scroll-area";

export default function NoteProperties({
  properties,
}: {
  properties: { name: string; value: string }[];
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor="note-properties-field">
        <h3 className="font-semibold">Properties ( {properties.length} )</h3>
      </label>
      <ScrollArea className="flex h-full max-h-[65svh] w-full flex-col overflow-y-auto md:max-h-[55svh]">
        <div className="mx-auto grid w-full grid-cols-1 place-items-center gap-3 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((prop, index) => (
            <div
              key={index}
              className="flex w-[90%] cursor-pointer flex-col gap-2 rounded-lg border p-4 transition-colors duration-200 ease-in-out hover:bg-primary/10"
            >
              <h3 className="text-primary">{prop.name}:</h3>
              <p className="">{prop.value}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
