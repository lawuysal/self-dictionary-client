import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SocialSignup from "./components/SocialSignup";
import EmailSignup from "./components/EmailSignup";
import { NavLink } from "react-router-dom";
import ROUTES from "@/routes/Routes.enum";

export default function SignupPage() {
  return (
    <main className="flex min-h-[calc(100svh-68px)] flex-col items-center justify-center md:min-h-[calc(100svh-72px)]">
      <Card className="w-[22rem] md:w-[26rem]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>and start to use Self Dictionary</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Social Signup */}
          <SocialSignup />

          {/* Seperator */}
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-full bg-primary"></div>
            <p className="text-nowrap text-xs text-muted-foreground">
              OR CONTINUE WITH
            </p>
            <div className="h-[1px] w-full bg-primary"></div>
          </div>

          {/* Email Signup */}
          <EmailSignup />
        </CardContent>

        <CardFooter className="flex flex-col gap-6">
          <div className="flex w-full flex-col items-center justify-center gap-1">
            <p className="text-sm text-muted-foreground">
              Or you have an existing account?
            </p>
            <NavLink to={ROUTES.LOGIN} className="w-full">
              <Button variant="secondary" className="w-full">
                Try to login
              </Button>
            </NavLink>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
