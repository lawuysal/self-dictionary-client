import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Language } from "../types/language.entity";

export default function LanguageCard({ language }: { language: Language }) {
  return (
    <Card className="w-[90%] shadow-sm transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-muted/40 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{language.name}</CardTitle>
        <CardDescription>{language.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
