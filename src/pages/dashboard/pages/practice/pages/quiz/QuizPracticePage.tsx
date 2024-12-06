import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStartQuizPractice } from "./hooks/useStartQuizPractice";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import QuizScreen from "./components/QuizScreen";

export default function QuizPracticePage() {
  const quizPracticeStartMutation = useStartQuizPractice(
    "b3504f7b-3d55-41ef-a0e7-f4d3f61958db",
  );

  const { isQuizPracticeStarted } = useSelector(
    (state: RootState) => state.quizPractice,
  );

  function handleStartQuizPractice() {
    quizPracticeStartMutation.mutate();
  }

  return (
    <main className="mt-2 flex w-full justify-center md:mt-5">
      <Card className="h-[90svh] w-[95%] md:h-[88svh]">
        <CardHeader className="grid grid-cols-1 place-items-center gap-2 rounded-t-lg border-b bg-background p-4 dark:bg-primary/10 md:p-6 lg:grid lg:grid-cols-2 lg:grid-rows-1">
          <div className="flex flex-col gap-2 justify-self-start">
            <CardTitle>Quiz Practice page: English </CardTitle>
            <CardDescription>
              Practice through your notes with quizes.
            </CardDescription>
          </div>

          {/* Trailing */}
          <div className="flex w-full items-center justify-center gap-2 md:px-8"></div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-8">
          {!isQuizPracticeStarted && (
            <Button onClick={handleStartQuizPractice} className="mt-8">
              Start Quiz
            </Button>
          )}

          <QuizScreen />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
