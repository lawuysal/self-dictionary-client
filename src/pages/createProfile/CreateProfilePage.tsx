import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CreateProfileRequest } from "./types/createProfileRequest.type";
import { useCreateProfile } from "./hooks/useCreateProfile";
import { CreatePreferenceRequest } from "./types/createPreferenceRequest.type";
import { Themes } from "./enums/themes.enum";
import { Languages } from "./enums/languages.enum";
import { useCreatePreference } from "./hooks/useCreatePreference";

export default function CreateProfilePage() {
  const { toast } = useToast();
  const createProfileMutation = useCreateProfile();
  const createPreferenceMutation = useCreatePreference();

  const [formData, setFormData] = useState<CreateProfileRequest>({
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    photoUrl: "",
    ownerId: localStorage.getItem("userId") || "",
  });

  function getLanguageFromNavigator(): Languages {
    const navigatorLang = localStorage.getItem("i18nextLng");

    if (!navigatorLang) {
      return Languages.ENGLISH_SHORT;
    }

    const languageValues = Object.values(Languages);
    const matchedLanguage = languageValues.find((lang) =>
      navigatorLang.includes(lang),
    );

    return (matchedLanguage as Languages) || Languages.ENGLISH_SHORT;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Profile Created",
      description: "Your profile has been successfully created!",
    });

    const preferenceData: CreatePreferenceRequest = {
      theme: Themes.SYSTEM,
      language: getLanguageFromNavigator(),
      ownerId: localStorage.getItem("userId") || "",
    };

    createProfileMutation.mutate(formData);
    createPreferenceMutation.mutate(preferenceData);
  };

  return (
    <main className="mx-auto flex min-h-[calc(100svh-68px)] max-w-[90rem] flex-col items-center justify-center px-4 md:min-h-[calc(100svh-72px)]">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
          <CardDescription>
            Create a profile if you want to continue using{" "}
            <strong>Self Dictionary</strong>.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username*</Label>
              <Input
                pattern="[a-z0-9]+"
                minLength={2}
                maxLength={30}
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name*</Label>
              <Input
                pattern="^[\p{L}]+(?:[\s\-'][\p{L}]+)*$"
                minLength={2}
                maxLength={30}
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                pattern="^[\p{L}]+(?:[\s\-'][\p{L}]+)*$"
                minLength={2}
                maxLength={30}
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                maxLength={150}
                id="bio"
                name="bio"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Create Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
