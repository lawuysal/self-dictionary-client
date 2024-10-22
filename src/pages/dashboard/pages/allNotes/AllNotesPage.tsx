import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Note } from "./types/note.entity";
import NoteItem from "./components/NoteItem";

const notes: Note[] = [
  { text: "Item 1", intensity: 100 },
  { text: "Item 9", intensity: 20 },
  { text: "Item 7", intensity: 40 },
  { text: "Item 3", intensity: 80 },
  { text: "Item 5", intensity: 60 },
  { text: "Item 6", intensity: 50 },
  { text: "Item 4", intensity: 70 },
  { text: "Item 8", intensity: 30 },
  { text: "Item 2", intensity: 90 },
  { text: "Item 10", intensity: 10 },
];

export default function AllNotesPage() {
  return (
    <main className="mt-5 flex w-full justify-center md:mt-16">
      <Card className="h-fit w-[90%]">
        <CardHeader className="grid grid-cols-2 grid-rows-2 place-items-center rounded-t-lg border-b bg-background dark:bg-primary/10 lg:grid lg:grid-cols-[1fr_4fr_1fr] lg:grid-rows-1">
          <div className="flex flex-col gap-2 justify-self-start">
            <CardTitle>All notes</CardTitle>
            <CardDescription>15 note(s) found.</CardDescription>
          </div>
          <div className="w-full md:w-full">
            <div className="relative">
              <Input className="pl-10" />
              <Search className="top- absolute left-2 top-3" size={16} />
            </div>
          </div>
          <div>Trailing</div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60svh] w-full rounded-lg">
            <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-4">
              {notes.map((note, index) => (
                <NoteItem key={index} note={note} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
