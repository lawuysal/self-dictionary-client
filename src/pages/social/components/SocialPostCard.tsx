import { Endpoints } from "@/api/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { GetSocialPostResponse } from "@/types/dtos/GetSocialPostResponse.dto";
import { formatTimeAgoForSocial } from "@/util/formatTimeAgoForSocial";
import { ArrowUp } from "lucide-react";
import { useSelector } from "react-redux";
import { useAddPositiveActionOnPost } from "../hooks/useAddPositiveActionOnPost";
import { useRemovePositiveActionFromPost } from "../hooks/useRemovePositiveActionFromPost";
import { NavLink } from "react-router-dom";
import ROUTES from "@/routes/Routes.enum";

export default function SocialPostCard({
  post,
}: {
  post: GetSocialPostResponse;
}) {
  const { userId } = useSelector((state: RootState) => state.auth);
  const addPositiveActionOnPostMutation = useAddPositiveActionOnPost();
  const removePositiveActionFromPostMutation =
    useRemovePositiveActionFromPost();

  function handlePositiveActionBgColor() {
    if (
      post.positiveActionsBy.filter((action) => action.userId === userId)
        .length > 0
    ) {
      return "bg-primary/70";
    }

    return "bg-transparent";
  }

  function handlePositiveActionDetails() {
    if (post.positiveActionCount === 0) {
      return;
    }

    if (post.positiveActionCount === 1) {
      return (
        <p className="text-sm text-muted-foreground">
          Supported by{" "}
          <span className="cursor-pointer font-semibold hover:text-foreground">
            @{post.positiveActionsBy[0].userUsername}
          </span>
        </p>
      );
    }

    return (
      <p className="text-sm text-muted-foreground">
        Supported by{" "}
        <span className="cursor-pointer font-semibold hover:text-foreground">
          @{post.positiveActionsBy[0].userUsername}
        </span>{" "}
        and {post.positiveActionCount - 1} other
      </p>
    );
  }

  function handleAddingPositiveAction() {
    addPositiveActionOnPostMutation.mutate({
      socialPostId: post.id,
      userId: userId!,
    });
  }

  function handleRemovingPositiveAction() {
    removePositiveActionFromPostMutation.mutate({
      socialPostId: post.id,
      userId: userId!,
    });
  }

  function handlePositiveAction() {
    if (
      post.positiveActionsBy.filter((action) => action.userId === userId)
        .length > 0
    ) {
      handleRemovingPositiveAction();
    } else {
      handleAddingPositiveAction();
    }
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border px-4 pb-1 pt-4">
      {/*Content */}
      <div className="flex flex-row items-start gap-2">
        <Avatar className="mt-1 flex items-center justify-center">
          <AvatarImage
            src={`${Endpoints.STATIC_URL}/${post.owner.photoUrl}`}
            alt={post.owner.firstName + post.owner.lastName + "profile photo"}
          />
          <AvatarFallback>
            {post.owner.firstName[0] + post.owner.lastName[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <div className="flex items-center space-x-4">
            <div className="flex flex-row items-center gap-2">
              <NavLink
                to={ROUTES.SOCIAL_PROFILE_BY_USERNAME_GEN(post.owner.username)}
              >
                <h3 className="text-base font-semibold hover:underline">
                  {post.owner.firstName + " " + post.owner.lastName}
                </h3>
              </NavLink>

              {/* Username and time */}
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <NavLink
                  to={ROUTES.SOCIAL_PROFILE_BY_USERNAME_GEN(
                    post.owner.username,
                  )}
                  className="hover:text-foreground"
                >
                  @{post.owner.username}
                </NavLink>
                <p className="text-[0.50rem]">•</p>
                <p className="ml-auto">
                  {formatTimeAgoForSocial(new Date(post.createdAt))}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p>{post.content}</p>
          </div>

          {/* Footer */}
          <div className="my-2 flex items-center justify-start gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePositiveAction()}
              className={` ${handlePositiveActionBgColor()}`}
            >
              <ArrowUp className="size-4" />
              <p
                className={`ml-1 text-xs ${post.positiveActionCount === 0 ? "hidden" : "flex"} `}
              >
                {post.positiveActionCount}
              </p>
            </Button>
            <div>{handlePositiveActionDetails()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
