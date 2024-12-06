import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { useUpdateNote } from "../hooks/useUpdateNoteById";
import { UpdateNoteRequestDto } from "../types/updateNoteRequest.dto";
import { Note } from "@/types/entities/note.entity";
import { Switch } from "@/components/ui/switch";

type Inputs = {
  name: string;
  translation: string;
  description: string;
  isPublic: boolean;
};

export default function NoteUpdatingDialog({ note }: { note: Note }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
    control,
  } = useForm<Inputs>();
  const updateNoteMutation = useUpdateNote(note.id);

  function onSubmit(data: Inputs) {
    const updateNoteData: UpdateNoteRequestDto = {
      ...data,
      languageId: note.languageId,
    };

    updateNoteMutation.mutate(updateNoteData);
  }

  useEffect(() => {
    if (updateNoteMutation.isSuccess) {
      resetForm({
        name: note.name,
        translation: note.translation,
        description: note.description,
        isPublic: note.isPublic,
      });
      setIsOpen(false);
    }
  }, [
    note.description,
    note.isPublic,
    note.name,
    note.translation,
    resetForm,
    updateNoteMutation.isSuccess,
  ]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full items-center justify-center">
          <button className="flex items-center justify-start gap-2 rounded border border-blue-500/40 bg-blue-500/10 p-2 text-sm hover:bg-blue-500/20 md:w-[85%]">
            <div className="flex size-5 items-center justify-center rounded-sm md:border md:border-blue-500/40 md:bg-blue-400/30">
              <Pencil className="size-5 md:size-3" />
            </div>
            <p className="hidden md:flex">Edit Note</p>
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Update your note</DialogTitle>
          <DialogDescription>
            Update your note with the new information you want to add or change.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {/* Name */}
            <div className="mt-10 flex flex-col gap-2">
              <Label htmlFor="name">Name:</Label>
              <Input
                autoComplete="off"
                placeholder="e.g. Accumulate"
                type="text"
                id="name"
                {...register("name", {
                  required: true,
                  minLength: 1,
                  maxLength: 150,
                  value: note.name,
                })}
              />
              {errors.name && (
                <span className="text-xs text-destructive">
                  "Name is required and must be between 1-150 chars."
                </span>
              )}
            </div>

            {/* Translation */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="translation">Translation:</Label>
              <Input
                autoComplete="off"
                type="text"
                id="translation"
                {...register("translation", {
                  required: true,
                  minLength: 1,
                  maxLength: 150,
                  value: note.translation,
                })}
              />
              {errors.translation && (
                <span className="text-xs text-destructive">
                  "Translation is required and must be between 1-150 chars."
                </span>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description:</Label>
              <Input
                autoComplete="off"
                type="text"
                id="description"
                {...register("description", {
                  required: false,
                  minLength: 2,
                  maxLength: 200,
                  value: note.description,
                })}
              />
              {errors.description && (
                <span className="text-xs text-destructive">
                  "Description must be empty or between 2-200 chars."
                </span>
              )}
            </div>

            {/* Is Public */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="isPublic">Visibility:</Label>
              <Controller
                name="isPublic"
                control={control}
                defaultValue={note.isPublic}
                render={({ field }) => (
                  <Switch
                    id="isPublic"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                  />
                )}
              />
              {errors.isPublic && (
                <span className="text-xs text-destructive">
                  "Is Public is required."
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
