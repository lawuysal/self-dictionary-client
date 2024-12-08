import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useCreateSocialPost } from "../hooks/useCreateSocialPost";

export default function CreateSocialPostForm() {
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState(false);
  const createSocialPostMutation = useCreateSocialPost();
  const userId = localStorage.getItem("userId");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (content.length === 0) {
      return;
    }

    createSocialPostMutation.mutate({ content, ownerId: userId! });
  }

  useEffect(() => {
    if (content.length === 0 || createSocialPostMutation.isPending) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    if (createSocialPostMutation.isSuccess) {
      setContent("");
    }
  }, [
    content.length,
    createSocialPostMutation.isPending,
    createSocialPostMutation.isSuccess,
  ]);

  return (
    <Card className="w-full">
      <CardHeader className="p-4">
        <h2 className="text-2xl font-bold">Create a Post</h2>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Textarea
              placeholder="What's on your mind?"
              className="w-full"
              maxLength={200}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <p className="absolute bottom-1 right-2 text-sm text-muted-foreground">
              {content.length}/200
            </p>
          </div>
          <Button type="submit" disabled={disabled} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
