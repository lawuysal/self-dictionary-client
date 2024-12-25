import { NavLink, useParams } from "react-router-dom";
import { useVerifyEmailToken } from "./hooks/useVerifyEmailToken";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ROUTES from "@/routes/Routes.enum";

export default function VerifyEmailPage() {
  const { token } = useParams<{ token: string }>();
  const { data, isLoading, isError, error } = useVerifyEmailToken(
    token as string,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    if (error?.message === "Too many requests. Please try again later.") {
      toast.error("Too many requests. Please try again later.");
      return (
        <main className="flex min-h-[calc(100svh-68px)] flex-col items-center md:min-h-[calc(100svh-72px)]">
          {error?.message}
        </main>
      );
    }

    if (error?.message === "Email is already verified.") {
      toast.error("Email is already verified.");
      return (
        <main className="flex min-h-[calc(100svh-68px)] flex-col items-center md:min-h-[calc(100svh-72px)]">
          {error?.message}
        </main>
      );
    }

    toast.error("Failed to verify email.", {
      description: "Please contact support.",
    });
    return (
      <main className="flex min-h-[calc(100svh-68px)] flex-col items-center md:min-h-[calc(100svh-72px)]">
        Failed to verify email. Please contact support.
      </main>
    );
  }

  return (
    <main className="flex min-h-[calc(100svh-68px)] flex-col items-center md:min-h-[calc(100svh-72px)]">
      <div className="mt-2 flex flex-col items-center gap-6 md:mt-5 md:gap-8">
        <h1 className="font-playfair text-4xl font-bold text-primary md:text-5xl">
          Email Verified
        </h1>
        <div className="w-[90%] space-y-4 rounded-lg border p-4 transition-colors duration-200 ease-in-out hover:bg-muted">
          <p className="text-center">
            Your email has been verified. You can now login to your account.
          </p>
          <Button className="w-full">
            <NavLink to={ROUTES.LOGIN}>Go to Login Page</NavLink>
          </Button>
        </div>
      </div>
    </main>
  );
}
