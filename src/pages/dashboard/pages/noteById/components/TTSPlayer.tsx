import { Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetTTSURL } from "../hooks/useGetTTSURL";
import { Endpoints } from "@/api/endpoints";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function TTSPlayer({
  text,
  language,
}: {
  text: string;
  language: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const getTTSURLMutation = useGetTTSURL(text, language, 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ttsPath, setTTSPath] = useState("");

  function handlePlay() {
    setIsPlaying(true);

    if (!ttsPath) {
      getTTSURLMutation.mutate();
    }
  }

  useEffect(() => {
    if (ttsPath && isPlaying) {
      const audio = audioRef.current;
      if (audio) {
        audio.src = Endpoints.GET_TTS_AUDIO(ttsPath);
        audio.play();
      }
    } else {
      if (getTTSURLMutation.isSuccess && isPlaying) {
        setTTSPath(getTTSURLMutation.data?.path || "");
      }
    }
  }, [
    getTTSURLMutation.data?.path,
    getTTSURLMutation.isSuccess,
    isPlaying,
    ttsPath,
  ]);

  return (
    <Button
      className="m-0 bg-transparent p-0 hover:bg-transparent"
      onClick={handlePlay}
    >
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      <Volume2
        className={cn(
          "size-8",
          isPlaying
            ? "text-primary hover:text-primary/90"
            : "hover:text-foreground/90",
        )}
      />
    </Button>
  );
}

export default TTSPlayer;
