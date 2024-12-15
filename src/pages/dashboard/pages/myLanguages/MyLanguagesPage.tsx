import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import LanguageCard from "./components/LanguageCard";
import LanguageAddingDialog from "./components/LanguageAddingDialog";
import { useGetLanguagesByUserId } from "./hooks/useGetLanguagesByUserId";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loader from "@/components/Loader";

export default function MyLanguagesPage() {
  const { userId } = useSelector((state: RootState) => state.auth);
  const {
    data: myLanguages,
    error,
    isLoading,
  } = useGetLanguagesByUserId(userId!);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || !myLanguages) {
    return <Loader />;
  }

  return (
    <main className="mt-2 flex w-full justify-center md:mt-5 md:pl-9">
      <Card className="h-[90svh] w-[95%] md:h-[88svh] md:w-full">
        <CardHeader className="flex flex-row items-center justify-between rounded-t-lg border-b bg-background dark:bg-primary/10">
          <div className="flex flex-col gap-2">
            <CardTitle>My Languages</CardTitle>
            <CardDescription>
              {myLanguages.length} language(s) found.
            </CardDescription>
          </div>
          <LanguageAddingDialog />
        </CardHeader>

        <CardContent className="">
          <ScrollArea className="h-[69svh] w-full rounded-lg">
            <div className="mx-auto mt-5 grid grid-cols-1 items-center justify-center gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {myLanguages.map((language, index) => (
                <LanguageCard key={index} language={language} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
