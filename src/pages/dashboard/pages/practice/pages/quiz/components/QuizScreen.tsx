import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useCheckQuizQuestionAnswer } from "../hooks/useCheckQuizQuestionAnswer";
import {
  finishQuizPractice,
  increaseCorrectAnswers,
  increaseWrongAnswers,
  resetQuizPractice,
  setCurrentQuestionUserAnswer,
  switchToNextQuestion,
} from "@/redux/slices/quizPractice/quizPracticeSlice";
import { Button } from "@/components/ui/button";

export default function QuizScreen() {
  const {
    quizQuestions,
    currentQuestionIndex,
    currentQuestionCorrectAnswer,
    currentQuestionUserAnswer,
    correctAnswers,
    wrongAnswers,
    isQuizPracticeStarted,
    isQuizPracticeFinished,
    isCurrentQuestionAnswered,
    isCurrentQuestionUserAnswerIsCorrect,
  } = useSelector((state: RootState) => state.quizPractice);

  const dispatch = useDispatch();

  const checkQuizQuestionAnswerMutation = useCheckQuizQuestionAnswer();

  function handleAnswerSelection(noteId: string, answer: string) {
    checkQuizQuestionAnswerMutation.mutate({ noteId, answer });
    dispatch(setCurrentQuestionUserAnswer(answer));
  }

  function handleNextQuestion() {
    if (currentQuestionIndex + 1 === quizQuestions.length) {
      dispatch(finishQuizPractice());
      return;
    }

    dispatch(switchToNextQuestion());

    if (isCurrentQuestionUserAnswerIsCorrect) {
      dispatch(increaseCorrectAnswers());
    }

    if (!isCurrentQuestionUserAnswerIsCorrect) {
      dispatch(increaseWrongAnswers());
    }
  }

  function handleAnswerButtonColor(option: string) {
    if (isCurrentQuestionAnswered && currentQuestionUserAnswer === option) {
      if (isCurrentQuestionUserAnswerIsCorrect) {
        return "bg-green-500";
      } else {
        return "bg-red-500";
      }
    }

    if (isCurrentQuestionAnswered) {
      if (currentQuestionCorrectAnswer === option) {
        return "bg-green-500";
      }
    }

    return "";
  }

  function handleRestartQuiz() {
    dispatch(resetQuizPractice());
  }

  if (!isQuizPracticeStarted) {
    return;
  }

  if (!quizQuestions) {
    return <p>Loading...</p>;
  }

  if (isQuizPracticeFinished) {
    return (
      <div className="mt-8 flex flex-col justify-center gap-8 rounded-md border p-8">
        <h3 className="text-2xl font-semibold text-primary">
          Quiz practice finished
        </h3>
        <div className="flex flex-col gap-2">
          <p>✔ Correct answers: {correctAnswers}</p>
          <p>❌ Wrong answers: {wrongAnswers}</p>
        </div>

        <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-8 rounded-md border p-8">
      <div className="flex items-center justify-between">
        <p className="">
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </p>
        {!isQuizPracticeFinished && (
          <div className="flex items-center justify-center gap-2">
            <p>✔: {correctAnswers}</p>
            <p>❌: {wrongAnswers}</p>
          </div>
        )}
      </div>
      <p className="font text-2xl font-semibold">
        What's the meaning of "{quizQuestions[currentQuestionIndex].noteName}"
      </p>

      <div className="flex items-center justify-center gap-8">
        {quizQuestions[currentQuestionIndex].options.map((option) => (
          <Button
            disabled={isCurrentQuestionAnswered}
            variant="outline"
            key={
              quizQuestions[currentQuestionIndex].noteId +
              option +
              "option" +
              Math.random()
            }
            className={`${handleAnswerButtonColor(option)}`}
            onClick={() =>
              handleAnswerSelection(
                quizQuestions[currentQuestionIndex].noteId,
                option,
              )
            }
          >
            {option}
          </Button>
        ))}
      </div>
      {isCurrentQuestionAnswered && (
        <div
          className={`${isCurrentQuestionUserAnswerIsCorrect ? "bg-green-500/50" : "bg-red-500/50"} rounded-md p-4`}
        >
          <p className="">
            Your answer is{" "}
            {isCurrentQuestionUserAnswerIsCorrect ? "correct" : "wrong"}
          </p>
          <p>Correct answer is "{currentQuestionCorrectAnswer}" </p>
        </div>
      )}

      <Button
        disabled={!isCurrentQuestionAnswered}
        onClick={handleNextQuestion}
      >
        {currentQuestionIndex === quizQuestions.length - 1
          ? "Finish quiz"
          : "Next question"}
      </Button>
    </div>
  );
}
