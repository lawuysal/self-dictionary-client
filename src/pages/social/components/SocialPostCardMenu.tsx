import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";
import { useDeleteSocialPost } from "../hooks/useDeleteSocialPost";
import { useState } from "react";

export default function SocialPostCardMenu({
  userId,
  postOwnerId,
  postId,
}: {
  userId: string;
  postOwnerId: string;
  postId: string;
}) {
  const deleteSocialPostMutation = useDeleteSocialPost();
  const [isOpen, setIsOpen] = useState(false);

  function handleDeletePost() {
    setIsOpen(false);
    deleteSocialPostMutation.mutate(postId);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Ellipsis className="size-4 text-muted-foreground hover:text-foreground" />
      </PopoverTrigger>
      <PopoverContent className="bg-background">
        <div className="flex flex-col gap-4 text-center">
          <h3>Do you want to delete the post?</h3>
          <div className="flex flex-row-reverse items-center justify-center gap-4">
            <Button variant="destructive" onClick={handleDeletePost}>
              Delete
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
