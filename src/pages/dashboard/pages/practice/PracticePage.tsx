import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ROUTES from "@/routes/Routes.enum";
import { NavLink } from "react-router-dom";

export default function PracticePage() {
  return (
    <main className="mt-2 flex w-full justify-center md:mt-5">
      <Card className="h-[90svh] w-[95%] md:h-[88svh]">
        <CardHeader className="grid grid-cols-1 place-items-center gap-2 rounded-t-lg border-b bg-background p-4 dark:bg-primary/10 md:p-6 lg:grid lg:grid-cols-2 lg:grid-rows-1">
          <div className="flex flex-col gap-2 justify-self-start">
            <CardTitle>Practice page: English </CardTitle>
            <CardDescription>Practice through your notes.</CardDescription>
          </div>

          {/* Trailing */}
          <div className="flex w-full items-center justify-center gap-2 md:px-8"></div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-8">
          <h2 className="mt-10 text-2xl font-semibold text-primary">
            Select a practice method
          </h2>
          <div className="grid grid-cols-2 place-items-center items-center gap-4 rounded-md">
            <div className="flex cursor-pointer flex-col gap-2 rounded-md border hover:bg-primary/10">
              <h3 className="border-b bg-background p-4 text-lg font-semibold dark:bg-primary/10">
                Flashcards
              </h3>
              <p className="p-4">Practice through flashcards.</p>
            </div>

            <NavLink
              to={ROUTES.QUIZ_PRACTICE}
              className="flex cursor-pointer flex-col gap-2 rounded-md border hover:bg-primary/10"
            >
              <h3 className="border-b bg-background p-4 text-lg font-semibold dark:bg-primary/10">
                Quiz
              </h3>
              <p className="p-4">Practice through quizzes.</p>
            </NavLink>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
