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
import { NavLink, useParams } from "react-router-dom";
import { useGetLanguageById } from "../../../languageById/hooks/useGetLanguageById";
import { ArrowLeft } from "lucide-react";
import ROUTES from "@/routes/Routes.enum";

export default function QuizPracticePage() {
  const { languageId } = useParams();
  const { data: languageData, isLoading } = useGetLanguageById(languageId!);
  const quizPracticeStartMutation = useStartQuizPractice(languageId!);

  const { isQuizPracticeStarted } = useSelector(
    (state: RootState) => state.quizPractice,
  );

  function handleStartQuizPractice() {
    quizPracticeStartMutation.mutate();
  }

  if (!languageData || isLoading) {
    return;
  }

  return (
    <main className="mt-2 flex w-full justify-center md:mt-5">
      <Card className="h-[90svh] w-[95%] md:h-[88svh]">
        <CardHeader className="grid grid-cols-1 place-items-center gap-2 rounded-t-lg border-b bg-background p-4 dark:bg-primary/10 md:p-6 lg:grid lg:grid-cols-3 lg:grid-rows-1">
          {/* title */}
          <div className="flex h-full w-full flex-row items-center justify-start gap-2 justify-self-start md:w-fit md:flex-row md:items-center">
            <div className="h-full">
              <NavLink to={ROUTES.PRACTICE_GEN(languageId!)}>
                <Button size="icon" variant="ghost" className="h-full">
                  <ArrowLeft className="size-6" />
                </Button>
              </NavLink>
            </div>

            <div className="flex flex-col items-start justify-center">
              <CardTitle className="text-xl md:text-2xl">
                Quiz Practice page: {languageData.name}
              </CardTitle>
              <CardDescription>
                Practice through your notes with quizes.
              </CardDescription>
            </div>
          </div>

          {/* <NotesSearchbar /> */}
          <div className="hidden md:flex"></div>

          {/* trailing */}
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
