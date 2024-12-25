import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSignup } from "../hooks/useSignup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SignupUserRequestSchema } from "../types/signupUserRequest.type";
import { useState } from "react";

export default function EmailSignup() {
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupMutation = useSignup();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsedBody = SignupUserRequestSchema.safeParse({ email, password });

    if (!parsedBody.success) {
      toast({
        title: "Invalid input",
        description: parsedBody.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    signupMutation.mutate(parsedBody.data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="SD-signup-email">Email:</Label>
          <Input
            type="email"
            id="SD-signup-email"
            placeholder="Email"
            autoComplete="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="SD-signup-password">Password:</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="SD-signup-password"
              placeholder="Password"
              required
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              variant="link"
              className="absolute bottom-0 right-0 z-40"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </div>
    </form>
  );
}
