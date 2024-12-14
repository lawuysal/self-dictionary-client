import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileUpdateForm from "./components/ProfileUpdateForm";

export default function ProfilePage() {
  return (
    <main className="mt-2 flex w-full justify-center md:mt-5">
      <Card className="h-fit w-[95%]">
        <CardHeader className="grid grid-cols-1 place-items-center gap-2 rounded-t-lg border-b bg-background p-4 dark:bg-primary/10 md:p-6 lg:grid lg:grid-cols-2 lg:grid-rows-1">
          <div className="flex flex-col gap-2 justify-self-start">
            <CardTitle>My Profile</CardTitle>
            <CardDescription></CardDescription>
          </div>

          {/* Trailing */}
          {/* <div className="flex w-full items-center justify-center gap-2 md:px-8"></div> */}
        </CardHeader>
        <CardContent>
          <ProfileUpdateForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
