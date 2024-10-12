import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SocialSignup() {
  return (
    <div className="flex justify-between gap-2">
      <Button
        className="flex w-full items-center justify-center gap-2"
        variant="outline"
      >
        <FaGithub />
        <p>Github</p>
      </Button>
      <Button
        className="flex w-full items-center justify-center gap-2"
        variant="outline"
      >
        <FaGoogle />
        <p>Google</p>
      </Button>
    </div>
  );
}
