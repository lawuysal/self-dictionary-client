import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Share2 } from "lucide-react";
import SharedSocialPostCard from "./SharedSocialPostCard";
import { Button } from "@/components/ui/button";
import { useCreateSocialPost } from "@/pages/social/hooks/useCreateSocialPost";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/routes/Routes.enum";
import { waitAndExecute } from "@/util/waitAndExecute";

export default function ShareOnSocialDialog({
  shareTitle,
  shareDescription,
  shareContent,
}: {
  shareTitle: string;
  shareDescription?: string;
  shareContent: string;
}) {
  const createSocialPostMutation = useCreateSocialPost();
  const navigate = useNavigate();
  const { userId } = useSelector((state: RootState) => state.auth);

  function handlePost() {
    createSocialPostMutation.mutate({
      content: shareContent,
      ownerId: userId!,
      isGenerated: true,
    });
  }

  useEffect(() => {
    if (createSocialPostMutation.isSuccess) {
      createSocialPostMutation.reset();
      waitAndExecute(1000, () => navigate(ROUTES.MY_SOCIAL_POSTS));
    }
  }, [createSocialPostMutation, navigate]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Share2 className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="w-[95%] rounded-lg">
        <DialogHeader>
          <DialogTitle>{shareTitle}</DialogTitle>
          <DialogDescription>{shareDescription}</DialogDescription>
        </DialogHeader>
        <SharedSocialPostCard shareContent={shareContent} />
        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handlePost}>Post on Social</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
