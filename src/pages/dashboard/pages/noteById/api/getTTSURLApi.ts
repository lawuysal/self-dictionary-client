import { Endpoints } from "@/api/endpoints";
import { GetTTSUrlRequestDto } from "../types/getTTSUrlRequest.dto";

export async function getTTSURLApi(ttsData: GetTTSUrlRequestDto) {
  return await fetch(Endpoints.TTS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(ttsData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to get TTS URL");
      }
      return res.json();
    })
    .then((data) => data as { path: string })
    .catch((error) => {
      throw error;
    });
}
