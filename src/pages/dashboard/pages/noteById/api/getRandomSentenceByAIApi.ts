import { Endpoints } from "@/api/endpoints";
import { getRandomSentenceRequestDto } from "../types/getRandomSentenceRequest.dto";
import { getRandomSentenceResponseDto } from "../types/getRandomSentenceResponse.dto";

export async function getRandomSentenceByAIApi(
  data: getRandomSentenceRequestDto,
) {
  return await fetch(Endpoints.GENERATIVE_AI_GET_SENTENCE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch note");
      }
      return res.json();
    })
    .then((data) => data as getRandomSentenceResponseDto)
    .catch((error) => {
      throw error;
    });
}
