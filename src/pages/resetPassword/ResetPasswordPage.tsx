import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useResetPassword } from "./hooks/useResetPassword";
import { useCheckPasswordResetToken } from "./hooks/useCheckPasswordResetToken";
import Loader from "@/components/Loader";
import { LoaderCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const {
    data: checkTokenData,
    isLoading,
    isError,
  } = useCheckPasswordResetToken(token as string);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const resetPasswordMutation = useResetPassword();

  const onVerify = useCallback((token: string) => {
    setCaptchaToken(token);
  }, []);

  function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    resetPasswordMutation.mutate({
      password,
      passwordConfirmation,
      captchaToken,
      resetToken: token as string,
    });

    setRefreshReCaptcha((prev) => !prev);
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!checkTokenData || isError) {
    return (
      <main className="flex min-h-[calc(100svh-68px)] flex-col items-center md:min-h-[calc(100svh-72px)]">
        <div className="mt-2 flex w-fit flex-col items-center gap-6 md:mt-5 md:gap-8">
          <h1 className="font-playfair text-4xl font-bold text-primary md:text-5xl">
            Reset My Password
          </h1>
          <div className="w-[95%] space-y-4 rounded-lg border p-4 transition-colors duration-200 ease-in-out">
            <p className="text-center">
              The password reset link is invalid or has expired. Please request
              a new password reset link.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100svh-68px)] flex-col items-center md:min-h-[calc(100svh-72px)]">
      <div className="mt-2 flex w-fit flex-col items-center gap-6 md:mt-5 md:gap-8">
        <h1 className="font-playfair text-4xl font-bold text-primary md:text-5xl">
          Reset My Password
        </h1>
        <div className="w-[95%] space-y-4 rounded-lg border p-4 transition-colors duration-200 ease-in-out">
          <p className="text-center">
            Create a new password for your Self Dictionary account.
          </p>
          <form className="w-full space-y-4" onSubmit={handleForgotPassword}>
            <div className="space-y-2">
              <Label htmlFor="SD-new-password">Password</Label>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative w-full">
                  <Input
                    min={8}
                    autoComplete="new-password"
                    type={showPassword ? "text" : "password"}
                    id="SD-new-password"
                    placeholder="Password"
                    required
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="SD-new-password-confirmation">
                Confirm Password
              </Label>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative w-full">
                  <Input
                    min={8}
                    autoComplete="new-password"
                    type={showPassword ? "text" : "password"}
                    id="SD-new-password-confirmation"
                    placeholder="Confirm Password"
                    required
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
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
            <Button
              className="w-full"
              disabled={!captchaToken || resetPasswordMutation.isPending}
              type="submit"
            >
              {resetPasswordMutation.isPending && (
                <span className="mr-2 animate-spin">
                  <LoaderCircle className="size-5" />
                </span>
              )}{" "}
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
