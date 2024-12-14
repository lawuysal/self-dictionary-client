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
import { useGetLanguageNoteCountsById } from "@/pages/dashboard/hooks/useGetLanguageNoteCountsById";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { NoteIntensityTypes } from "@/types/enums/NoteIntensityTypes";

export default function QuizPracticePage() {
  const { languageId } = useParams();
  const { data: languageNoteCountsData } = useGetLanguageNoteCountsById(
    languageId!,
  );
  const { data: languageData, isLoading } = useGetLanguageById(languageId!);
  const [selectedCategory, setSelectedCategory] = useState<NoteIntensityTypes>(
    NoteIntensityTypes.All,
  );
  const quizPracticeStartMutation = useStartQuizPractice(
    languageId!,
    selectedCategory,
  );

  const { isQuizPracticeStarted } = useSelector(
    (state: RootState) => state.quizPractice,
  );

  function handleStartQuizPractice() {
    quizPracticeStartMutation.mutate();
  }

  if (!languageData || !languageNoteCountsData || isLoading) {
    return;
  }

  const intensityLevels = [
    {
      key: NoteIntensityTypes.All,
      label: "All notes",
      color: "bg-primary",
      count: languageNoteCountsData.totalCount,
    },
    {
      key: NoteIntensityTypes.Low,
      label: "Low intensity notes",
      color: "bg-[#f04b43]",
      count: languageNoteCountsData.lowIntensityCount,
    },
    {
      key: NoteIntensityTypes.LowMedium,
      label: "Low-medium intensity notes",
      color: "bg-[#df9140]",
      count: languageNoteCountsData.lowMediumIntensityCount,
    },
    {
      key: NoteIntensityTypes.Medium,
      label: "Medium intensity notes",
      color: "bg-[#e8c468]",
      count: languageNoteCountsData.mediumIntensityCount,
    },
    {
      key: NoteIntensityTypes.MediumHigh,
      label: "Medium-high intensity notes",
      color: "bg-[#9bc172]",
      count: languageNoteCountsData.mediumHighIntensityCount,
    },
    {
      key: NoteIntensityTypes.High,
      label: "High intensity notes",
      color: "bg-[#10b97b]",
      count: languageNoteCountsData.highIntensityCount,
    },
  ];

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
                Quiz Practice Page: {languageData.name}
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
          <div
            className={`mt-5 flex w-[20%] flex-col items-center justify-center gap-4 ${isQuizPracticeStarted ? "hidden" : ""}`}
          >
            <div className="space-y-2">
              <Label>Choose a note category to start quiz</Label>
              <Select
                disabled={isQuizPracticeStarted}
                defaultValue={NoteIntensityTypes.All}
                value={selectedCategory}
                onValueChange={(value) =>
                  setSelectedCategory(value as NoteIntensityTypes)
                }
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="flex flex-col justify-center gap-4">
                  {intensityLevels.map(({ key, label, color, count }) => (
                    <SelectItem key={key} value={key} className="flex">
                      <div className="flex items-center gap-3">
                        {label}: {count}
                        <div className={`${color} size-2 rounded-full`}></div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p
              className={cn(
                "text-center text-sm",
                (intensityLevels.find(
                  (option) => option.key === selectedCategory,
                )?.count as number) < 10
                  ? ""
                  : "hidden",
              )}
            >
              Note count for this category must be at least 10 to start quiz.
            </p>
          </div>

          {!isQuizPracticeStarted && (
            <Button
              disabled={
                (intensityLevels.find(
                  (option) => option.key === selectedCategory,
                )?.count as number) < 10
              }
              onClick={handleStartQuizPractice}
              className="mt-8"
            >
              Start Quiz on All Notes
            </Button>
          )}

          <QuizScreen />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
