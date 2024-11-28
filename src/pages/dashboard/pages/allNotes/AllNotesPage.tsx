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
import NoteItem from "./components/NoteItem";
import { useGetAllNotesByUserId } from "./hooks/useGetAllNotesByUserId";
import Loader from "@/components/Loader";

export default function AllNotesPage() {
  const {
    data: notes,
    isLoading,
    error,
  } = useGetAllNotesByUserId(localStorage.getItem("userId") || "");

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !notes) {
    return <Loader />;
  }

  return (
    <main className="mt-5 flex w-full justify-center md:mt-16">
      <Card className="h-fit w-[90%]">
        <CardHeader className="grid grid-cols-2 grid-rows-2 place-items-center rounded-t-lg border-b bg-background dark:bg-primary/10 lg:grid lg:grid-cols-[1fr_4fr_1fr] lg:grid-rows-1">
          <div className="flex flex-col gap-2 justify-self-start">
            <CardTitle>All notes</CardTitle>
            <CardDescription>{notes.length} note(s) found.</CardDescription>
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
