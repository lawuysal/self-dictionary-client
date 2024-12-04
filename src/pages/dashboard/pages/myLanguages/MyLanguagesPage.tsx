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
    <main className="mt-2 flex w-full justify-center md:mt-5">
      <Card className="h-[90svh] w-[95%] md:h-[88svh]">
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

// const myLanguages: Language[] = [
//   {
//     name: "English",
//     description:
//       "English is a West Germanic language first spoken in early medieval England, which has become the leading language of international discourse in the 21st century.",
//   },
//   {
//     name: "Spanish",
//     description:
//       "Spanish is a Romance language that originated in the Iberian Peninsula of Europe. Today, it is a global language with nearly 500 million native speakers, mainly in Spain and the Americas.",
//   },
//   {
//     name: "French",
//     description:
//       "French is a Romance language of the Indo-European family. It descended from the Vulgar Latin of the Roman Empire, as did all Romance languages.",
//   },
//   {
//     name: "German",
//     description:
//       "German is a West Germanic language that is mainly spoken in Central Europe. It is the most widely spoken and official or co-official language in Germany, Austria, Switzerland, Liechtenstein, and South Tyrol in Italy.",
//   },
// ];
