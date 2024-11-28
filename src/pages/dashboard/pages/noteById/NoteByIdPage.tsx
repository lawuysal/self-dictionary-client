import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useGetNoteById } from "./hooks/useGetNoteById";
import Loader from "@/components/Loader";
import NoteMenu from "./components/NoteMenu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const properties = [
  { name: "Property 1", value: "Value 1" },
  { name: "Property 2", value: "Value 2" },
  { name: "Property 3", value: "Value 3" },
  { name: "Property 4", value: "Value 4" },
  { name: "Property 5", value: "Value 5" },
  { name: "Property 6", value: "Value 6" },
  { name: "Property 7", value: "Value 7" },
  { name: "Property 8", value: "Value 8" },
  { name: "Property 9", value: "Value 9" },
  { name: "Property 10", value: "Value 10" },
  { name: "Property 11", value: "Value 11" },
];

export default function NoteByIdPage() {
  const { noteId } = useParams();
  const { data: note, isLoading, error } = useGetNoteById(noteId!);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || !note) {
    return <Loader />;
  }

  return (
    <main className="mt-5 flex w-full justify-center md:mt-16">
      <Card className="h-fit w-[90%]">
        <CardHeader className="flex rounded-t-lg border-b bg-background dark:bg-primary/10 lg:grid">
          <div className="flex flex-col gap-2 justify-self-start">
            <CardTitle>{note.name}</CardTitle>
            <CardDescription>{note.translation}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row">
          <NoteMenu note={note} />

          {/*Content*/}
          <div className="mt-5 flex flex-1 flex-col gap-4 md:ml-20 md:mt-12">
            {/*Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="note_description">Description:</Label>
              <div id="note_description" className="rounded-lg border p-4">
                {note.description}
              </div>
            </div>

            {/* Properties */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="note_properties">Properties:</Label>
              <ScrollArea className="h-[30svh] rounded-lg border md:h-[39svh]">
                {properties.map((property, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-between border-b px-8 py-4"
                  >
                    <p>{property.name}</p>
                    <p>{property.value}</p>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
