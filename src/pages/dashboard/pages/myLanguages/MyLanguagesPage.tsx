import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

export default function MyLanguagesPage() {
  return (
    <main className="mt-10 flex w-full justify-center md:mt-16">
      <Card className="h-fit w-[90%]">
        <CardHeader className="flex flex-row items-center justify-between rounded-t-lg border-b bg-background dark:bg-primary/10">
          <div className="flex flex-col gap-2">
            <CardTitle>My Languages</CardTitle>
            <CardDescription>4 language(s) found.</CardDescription>
          </div>

          <div>
            <Button>
              <Plus className="mr-2 size-4" /> Add New
            </Button>
          </div>
        </CardHeader>

        <CardContent className="">
          <ScrollArea className="h-[60svh] w-full rounded-lg">
            <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-4">
              <Card className="w-[90%] shadow-sm transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-muted/40 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">English</CardTitle>
                  <CardDescription>
                    English is a West Germanic language first spoken in early
                    medieval England, which has become the leading language of
                    international discourse in the 21st century.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="w-[90%] shadow-sm transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-muted/40 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Spanish</CardTitle>
                  <CardDescription>
                    Spanish is a Romance language that originated in the Iberian
                    Peninsula of Europe. Today, it is a global language with
                    nearly 500 million native speakers, mainly in Spain and the
                    Americas.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="w-[90%] shadow-sm transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-muted/40 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">French</CardTitle>
                  <CardDescription>
                    French is a Romance language of the Indo-European family. It
                    descended from the Vulgar Latin of the Roman Empire, as did
                    all Romance languages.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="w-[90%] shadow-sm transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-muted/40 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">German</CardTitle>
                  <CardDescription>
                    German is a West Germanic language that is mainly spoken in
                    Central Europe. It is the most widely spoken and official or
                    co-official language in Germany, Austria, Switzerland,
                    Liechtenstein, and South Tyrol in Italy.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
