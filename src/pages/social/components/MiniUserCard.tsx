import { Endpoints } from "@/api/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallbackText } from "@/util/getAvatarFallbackText";

type MiniUserCardProps = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
};

export default function MiniUserCard(data: MiniUserCardProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-10 border">
        <AvatarImage
          src={Endpoints.GET_IMAGE(data.photoUrl)}
          alt={`${data.firstName} ${data.lastName} profile picture`}
        />
        <AvatarFallback>
          {getAvatarFallbackText(data.firstName, data.lastName)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="font-semibold">
          {data.firstName + " " + data.lastName}
        </h2>
        <p className="text-muted-foreground">@{data.username}</p>
      </div>
    </div>
  );
}
