import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EmailSignup() {
  return (
    <form>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email:</Label>
          <Input type="email" id="email" placeholder="Email" required />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </div>
    </form>
  );
}
