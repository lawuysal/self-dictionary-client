import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useCreateLanguge } from "../hooks/useCreateLanguge";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { CreateLanguageRequest } from "../types/createLanguageRequest.dto";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetShadowLanguages } from "../hooks/useGetShadowLanguages";

type Inputs = {
  name: string;
  description: string;
  shadowLanguage: string;
};

export default function LanguageAddingDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
    control,
  } = useForm<Inputs>();
  const createLanguageMutation = useCreateLanguge();
  const { userId } = useSelector((state: RootState) => state.auth);
  const { data: shadowLanguages } = useGetShadowLanguages();

  const onSubmit = (data: Inputs) => {
    const createLanguageData: CreateLanguageRequest = {
      ...data,
      ownerId: userId!,
    };

    createLanguageMutation.mutate(createLanguageData);
  };

  useEffect(() => {
    if (createLanguageMutation.isSuccess) {
      resetForm();
      setIsOpen(false);
    }
  }, [createLanguageMutation.isSuccess, resetForm]);

  if (!shadowLanguages) {
    return;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" /> Add New
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Add a new language to learn</DialogTitle>
          <DialogDescription>
            "To know one language is to be one person; to know two is to be
            two."
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="mt-10 flex flex-col gap-2">
              <Label htmlFor="name">Name:</Label>
              <Input
                autoComplete="off"
                placeholder="e.g. English"
                type="text"
                id="name"
                {...register("name", {
                  required: true,
                  minLength: 2,
                  maxLength: 25,
                })}
              />
              {errors.name && (
                <span className="text-xs text-destructive">
                  "Name is required and must be between 2-25 chars."
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description:</Label>
              <Input
                autoComplete="off"
                type="text"
                id="description"
                {...register("description", {
                  required: true,
                  minLength: 5,
                  maxLength: 200,
                })}
              />
              {errors.description && (
                <span className="text-xs text-destructive">
                  "Description is required and must be between 5-200 chars."
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="shadowLanguage">Shadow Language:</Label>
              <Controller
                name="shadowLanguage"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a shadow language" />
                    </SelectTrigger>
                    <SelectContent>
                      {shadowLanguages.map((language) => (
                        <SelectItem
                          key={language.value + "shadowlanguage"}
                          value={language.value}
                        >
                          {language.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse gap-3">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>

            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
