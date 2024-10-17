import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PreferencesPage() {
  return (
    <Card className="mt-10 h-fit w-[90%] md:mt-16 md:w-[30%]">
      <CardHeader className="rounded-t-lg border-b bg-background dark:bg-primary/10">
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Set your preferences</CardDescription>
      </CardHeader>

      <form className="">
        <CardContent className="mt-12 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Select theme:</Label>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Select language:</Label>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="tr">Turkish</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="flex flex-row-reverse">
          <Button>Apply</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
