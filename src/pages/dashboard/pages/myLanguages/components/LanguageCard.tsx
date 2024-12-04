import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import ROUTES from "@/routes/Routes.enum";
import { Language } from "@/types/entities/language.entity";

export default function LanguageCard({ language }: { language: Language }) {
  return (
    <NavLink
      to={ROUTES.LANGUAGE_BY_ID_GEN(language.id)}
      className="h-full w-full rounded-lg shadow-sm transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-muted/40 hover:shadow-md"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-xl">{language.name}</CardTitle>
          <CardDescription>{language.description}</CardDescription>
        </CardHeader>
      </Card>
    </NavLink>

    // <NavLink
    //   to={ROUTES.LANGUAGE_BY_ID_GEN(language.id)}
    //   className="w-[90%] rounded-lg shadow-sm transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-muted/40 hover:shadow-md"
    // >
    //   <Card>
    //     <CardHeader>
    //       <CardTitle className="text-xl">{language.name}</CardTitle>
    //       <CardDescription>{language.description}</CardDescription>
    //     </CardHeader>
    //   </Card>
    // </NavLink>
  );
}
