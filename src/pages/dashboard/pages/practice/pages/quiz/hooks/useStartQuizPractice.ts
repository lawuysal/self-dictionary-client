import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { getRandomQuizQuestionsApi } from "../api/getRandomQuizQuestionsApi";
import { useDispatch } from "react-redux";
import { setQuizQuestions } from "@/redux/slices/quizPractice/quizPracticeSlice";
import { NoteIntensityTypes } from "@/types/enums/NoteIntensityTypes";

export function useStartQuizPractice(
  languageId: string,
  selectedCategory: NoteIntensityTypes,
) {
  const { toast } = useToast();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["startQuizPractice", languageId],
    mutationFn: () => getRandomQuizQuestionsApi(languageId, selectedCategory),
    onSuccess: (data) => {
      console.log(data);
      dispatch(setQuizQuestions(data));
      toast({
        title: "Quiz practice starts now",
      });
    },
    onError: (error) => {
      toast({
        title: "Starting quiz practice is failed.",
        description: `${error.message}`,
        variant: "destructive",
      });
      throw error;
    },
  });
}
