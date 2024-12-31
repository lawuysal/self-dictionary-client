import { Endpoints } from "@/api/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { ArrowUp } from "lucide-react";
import { useSelector } from "react-redux";

export default function SharedSocialPostCard({
  shareContent,
}: {
  shareContent: string;
}) {
  const { firstName, lastName, photoUrl, username } = useSelector(
    (state: RootState) => state.userProfile,
  );

  if (!firstName || !lastName || !username) {
    return;
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border px-4 pb-1 pt-4">
      {/*Content */}
      <div className="flex flex-row items-start gap-2">
        <Avatar className="mt-1 flex size-8 items-center justify-center border md:size-10">
          <AvatarImage
            src={Endpoints.GET_IMAGE(photoUrl || "")}
            alt={firstName + lastName + "profile photo"}
          />
          <AvatarFallback>
            {firstName[0] || "" + lastName[0] || ""}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <div className="flex items-center space-x-4">
            <div className="flex flex-row items-center gap-2">
              <h3 className="text-sm font-semibold hover:underline md:text-base">
                {firstName + " " + lastName}
              </h3>

              {/* Username and time */}
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground md:text-sm">
                @{username}
                <p className="text-[0.50rem]">•</p>
                <p className="ml-auto">1s</p>
              </div>
            </div>
          </div>

          <p className="text-[0.625rem] text-muted-foreground md:text-xs">
            Generated
          </p>

          <div>
            <p className="text-sm md:text-base">{shareContent}</p>
          </div>

          {/* Footer */}
          <div className="my-2 flex items-center justify-start gap-3">
            <Button variant="ghost" size="sm" onClick={() => {}} className={``}>
              <ArrowUp className="size-4" />
              <p className={`ml-1 text-xs`}>{}</p>
            </Button>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
