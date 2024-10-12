import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SocialLogin from "./components/SocialLogin";
import EmailLogin from "./components/EmailLogin";
import { NavLink } from "react-router-dom";
import ROUTES from "@/routes/Routes.enum";

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100svh-68px)] flex-col items-center justify-center md:min-h-[calc(100svh-72px)]">
      <Card className="w-[22rem] md:w-[26rem]">
        <CardHeader>
          <CardTitle>Login your account</CardTitle>
          <CardDescription>and continue to use Self Dictionary</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Social Login */}
          <SocialLogin />

          {/* Seperator */}
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-full bg-primary"></div>
            <p className="text-nowrap text-xs text-muted-foreground">
              OR CONTINUE WITH
            </p>
            <div className="h-[1px] w-full bg-primary"></div>
          </div>

          {/* Email Login */}
          <EmailLogin />
        </CardContent>

        <CardFooter className="flex flex-col gap-6">
          <div className="flex w-full flex-col items-center justify-center gap-1">
            <p className="text-sm text-muted-foreground">
              Don't you have an existing account?
            </p>
            <NavLink to={ROUTES.SIGNUP} className="w-full">
              <Button variant="secondary" className="w-full">
                Create Account
              </Button>
            </NavLink>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
