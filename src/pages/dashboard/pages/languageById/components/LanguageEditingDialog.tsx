import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { Language } from "@/types/entities/language.entity";
import { UpdateLanguageRequestDto } from "../types/updateLanguageRequest.dto";
import { useUpdateLanguage } from "../hooks/useUpdateLanguage";

type Inputs = {
  name: string;
  description: string;
};

export default function LanguageEditingDialog({
  language,
}: {
  language: Language;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<Inputs>();

  const updateLanguageMutation = useUpdateLanguage(language.id);

  function onSubmit(data: Inputs) {
    const updateLanguageData: UpdateLanguageRequestDto = {
      ...data,
      ownerId: language.ownerId,
    };

    updateLanguageMutation.mutate(updateLanguageData);
  }

  useEffect(() => {
    if (updateLanguageMutation.isSuccess) {
      resetForm();
      setIsOpen(false);
    }
  }, [updateLanguageMutation.isSuccess, resetForm, language]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full items-center justify-center">
          <button className="flex items-center justify-start gap-2 rounded border border-blue-500/40 bg-blue-500/10 p-2 text-sm hover:bg-blue-500/20 md:w-[85%]">
            <div className="flex size-5 items-center justify-center rounded-sm md:border md:border-blue-500/40 md:bg-blue-400/30">
              <Pencil className="size-5 md:size-3" />
            </div>
            <p className="hidden md:flex">Edit</p>
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit the language</DialogTitle>
          <DialogDescription>
            Edit the language name and description.
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
                  value: language.name,
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
                  value: language.description,
                })}
              />
              {errors.description && (
                <span className="text-xs text-destructive">
                  "Description is required and must be between 5-200 chars."
                </span>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse gap-3">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>

            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
