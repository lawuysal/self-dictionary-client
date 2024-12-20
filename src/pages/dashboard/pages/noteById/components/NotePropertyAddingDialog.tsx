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
import { Plus } from "lucide-react";
import { useCreateNoteProperty } from "../hooks/useCreateNoteProperty";
import { CreateNotePropertyRequestDto } from "../types/createNotePropertyRequest.dto";

type Inputs = {
  name: string;
  value: string;
  description: string;
};

export default function NotePropertyAddingDialog({
  noteId,
}: {
  noteId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<Inputs>();
  const createNotePropertyMutation = useCreateNoteProperty(noteId);

  function onSubmit(data: Inputs) {
    const createNotePropertyData: CreateNotePropertyRequestDto = {
      ...data,
      noteId,
    };

    createNotePropertyMutation.mutate(createNotePropertyData);
  }

  useEffect(() => {
    if (createNotePropertyMutation.isSuccess) {
      resetForm();
      setIsOpen(false);
    }
  }, [createNotePropertyMutation.isSuccess, resetForm]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full items-center justify-center">
          <button className="flex items-center justify-start gap-2 rounded border bg-primary/10 p-2 text-sm hover:bg-primary/20 md:w-[85%]">
            <div className="flex size-5 items-center justify-center rounded-sm md:border md:bg-primary/30">
              <Plus className="size-5 md:size-3" />
            </div>
            <p className="hidden md:flex">Add New Property</p>
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Add a new property to remember</DialogTitle>
          <DialogDescription>
            Add a new property to remember for this language.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="mt-10 flex flex-col gap-2">
              <Label htmlFor="name">Name:</Label>
              <Input
                autoComplete="off"
                placeholder="e.g. Past Tense"
                type="text"
                id="name"
                {...register("name", {
                  required: true,
                  minLength: 1,
                  maxLength: 50,
                })}
              />
              {errors.name && (
                <span className="text-xs text-destructive">
                  "Name is required and must be between 1-50 chars."
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="value">Value:</Label>
              <Input
                autoComplete="off"
                type="text"
                id="value"
                {...register("value", {
                  required: true,
                  minLength: 1,
                  maxLength: 150,
                })}
              />
              {errors.value && (
                <span className="text-xs text-destructive">
                  "Value is required and must be between 1-150 chars."
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
                  minLength: 1,
                  maxLength: 150,
                })}
              />
              {errors.description && (
                <span className="text-xs text-destructive">
                  "Description is required and must be between 1-150 chars."
                </span>
              )}
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
