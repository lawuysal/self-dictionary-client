import { Endpoints } from "@/api/endpoints";

export async function getQuizQuestionsAnswerApi(
  noteId: string,
  answer: string,
) {
  return await fetch(Endpoints.GET_QUIZ_QUESTION_ANSWER(noteId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ answer }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch answer");
      }
      return res.json();
    })
    .then((data) => data as { answer: string; isCorrect: boolean })
    .catch((error) => {
      throw error;
    });
}
