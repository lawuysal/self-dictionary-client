import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink, useParams } from "react-router-dom";
import { useGetNoteById } from "./hooks/useGetNoteById";
import Loader from "@/components/Loader";
import NoteMenu from "./components/NoteMenu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import ROUTES from "@/routes/Routes.enum";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
    <main className="mt-2 flex w-full justify-center overflow-hidden md:mt-5">
      <Card className="h-[88svh] w-[95%] md:h-[88svh]">
        <CardHeader className="flex w-full flex-row items-center gap-2 rounded-t-lg border-b bg-background p-4 dark:bg-primary/10 md:p-6">
          <div className="flex items-center justify-center">
            <NavLink to={ROUTES.LANGUAGE_BY_ID_GEN(note.languageId)}>
              <Button size="icon" variant="ghost" className="">
                <ArrowLeft className="size-6" />
              </Button>
            </NavLink>
          </div>
          <div className="flex flex-col justify-self-start">
            <CardTitle className="text-xl md:text-2xl">{note.name}</CardTitle>
            <CardDescription>{note.translation}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid h-fit grid-cols-1 md:grid-cols-[1fr_4fr]">
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
