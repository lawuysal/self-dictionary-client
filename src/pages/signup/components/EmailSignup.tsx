import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSignup } from "../hooks/useSignup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SignupUserRequestSchema } from "../types/signupUserRequest.type";
import { useCallback, useState } from "react";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";

export default function EmailSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const signupMutation = useSignup();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsedBody = SignupUserRequestSchema.safeParse({ email, password });

    if (!parsedBody.success) {
      toast.error("Invalid input", {
        description: parsedBody.error.errors[0].message,
      });
      return;
    }

    signupMutation.mutate({ captchaToken, ...parsedBody.data });

    setRefreshReCaptcha((prev) => !prev);
  }

  const onVerify = useCallback((token: string) => {
    setCaptchaToken(token);
  }, []);

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
        {/* <GoogleReCaptchaProvider
          reCaptchaKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}
          useEnterprise
        >
          <GoogleReCaptcha
            onVerify={onVerify}
            action="signup"
            refreshReCaptcha={refreshReCaptcha}
          />
        </GoogleReCaptchaProvider> */}
        <Button disabled={!captchaToken} type="submit" className="w-full">
          Create Account
        </Button>
      </div>
    </form>
  );
}
