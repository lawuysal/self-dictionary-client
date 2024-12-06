import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCurrentQuestionAnswerResponse } from "@/redux/slices/quizPractice/quizPracticeSlice";
import { getQuizQuestionsAnswerApi } from "../api/getQuizQuestionAnswerApi";

export function useCheckQuizQuestionAnswer() {
  const { toast } = useToast();
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["checkQuizQuestionAnswer"],
    mutationFn: ({ noteId, answer }: { noteId: string; answer: string }) =>
      getQuizQuestionsAnswerApi(noteId, answer),
    onSuccess: (data) => {
      console.log(data);
      dispatch(setCurrentQuestionAnswerResponse(data));
    },
    onError: (error) => {
      toast({
        title: "Getting answer is failed.",
        description: `${error.message}`,
        variant: "destructive",
      });
      throw error;
    },
  });
}
