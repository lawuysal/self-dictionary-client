import { Endpoints } from "@/api/endpoints";
import { QuizQuestion } from "@/types/entities/quizQuestion.entity";
import { NoteIntensityTypes } from "@/types/enums/NoteIntensityTypes";

export async function getRandomQuizQuestionsApi(
  languageId: string,
  selectedCategory: NoteIntensityTypes,
) {
  return await fetch(Endpoints.GET_RANDOM_QUIZ_QUESTIONS(languageId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ type: selectedCategory }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch questions");
      }
      return res.json();
    })
    .then((data) => data.quizQuestions as QuizQuestion[])
    .catch((error) => {
      throw error;
    });
}
