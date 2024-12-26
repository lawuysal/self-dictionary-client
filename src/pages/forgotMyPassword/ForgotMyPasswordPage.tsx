import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { useForgotPassword } from "./hooks/useForgotPassword";
import { LoaderCircle, Mail } from "lucide-react";

export default function ForgotMyPasswordPage() {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const forgotPasswordMutation = useForgotPassword();

  const onVerify = useCallback((token: string) => {
    setCaptchaToken(token);
  }, []);

  function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    forgotPasswordMutation.mutate({ email, captchaToken });

    setRefreshReCaptcha((prev) => !prev);
  }

  useEffect(() => {
    if (forgotPasswordMutation.isSuccess) {
      setEmail("");
      setCaptchaToken("");
      setRefreshReCaptcha((prev) => !prev);
    }
  }, [forgotPasswordMutation.isSuccess]);

  return (
    <main className="flex min-h-[calc(100svh-68px)] flex-col items-center md:min-h-[calc(100svh-72px)]">
      <div className="mt-2 flex flex-col items-center gap-6 md:mt-5 md:gap-8">
        <h1 className="font-playfair text-4xl font-bold text-primary md:text-5xl">
          Forgot My Password
        </h1>
        <div className="w-[90%] space-y-4 rounded-lg border p-4 transition-colors duration-200 ease-in-out">
          <p className="text-center">
            If you forget your password, type your email address and we will
            send a password reset link to your email address.
          </p>
          <form className="space-y-2" onSubmit={handleForgotPassword}>
            <Label htmlFor="SD-password-reset-email">Email</Label>
            <div className="flex flex-col gap-4 md:flex-row">
              <Input
                id="SD-password-reset-email"
                type="email"
                autoComplete="off"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                disabled={!captchaToken || forgotPasswordMutation.isPending}
                type="submit"
              >
                {forgotPasswordMutation.isPending ? (
                  <span className="mr-2">
                    <LoaderCircle className="size-5 animate-spin" />
                  </span>
                ) : (
                  <span className="mr-2">
                    <Mail className="size-5" />
                  </span>
                )}
                Send Password Reset Link
              </Button>
            </div>
            <GoogleReCaptchaProvider
              reCaptchaKey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}
              useEnterprise
            >
              <GoogleReCaptcha
                onVerify={onVerify}
                action="signup"
                refreshReCaptcha={refreshReCaptcha}
              />
            </GoogleReCaptchaProvider>
          </form>
        </div>
      </div>
    </main>
  );
}
