import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUpdateNoteProperty } from "../hooks/useUpdateNoteProperty";
import { UpdateNotePropertyRequestDto } from "../types/updateNotePropertyRequest.dto";
import NotePropertyDeletingDialog from "./NotePropertyDeletingDialog";

type Inputs = {
  name: string;
  value: string;
  description: string;
};

export default function NotePropertyEditingDialog({
  notePropertyId,
  noteId,
  name,
  value,
  description,
}: {
  notePropertyId: string;
  noteId: string;
  name: string;
  value: string;
  description: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<Inputs>();
  const updateNotePropertyMutation = useUpdateNoteProperty(
    notePropertyId,
    noteId,
  );

  function onSubmit(data: Inputs) {
    const updateNotePropertyData: UpdateNotePropertyRequestDto = {
      ...data,
      notePropertyId,
    };

    updateNotePropertyMutation.mutate(updateNotePropertyData);
  }

  useEffect(() => {
    if (updateNotePropertyMutation.isSuccess) {
      resetForm();
      setIsOpen(false);
    }
  }, [updateNotePropertyMutation.isSuccess, resetForm]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex w-[90%] cursor-pointer flex-col gap-2 rounded-lg border p-4 shadow-md transition-colors duration-200 ease-in-out hover:bg-primary/10">
          <h3 className="text-primary">{name}:</h3>
          <div className="flex flex-col">
            <p className="">{value}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit or delete this note property</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="mt-10 flex flex-col gap-2">
              <Label htmlFor="name">Name:</Label>
              <Input
                autoComplete="off"
                placeholder="e.g. Past Tense"
                defaultValue={name}
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
                defaultValue={value}
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
                defaultValue={description}
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

            <NotePropertyDeletingDialog
              noteId={noteId}
              notePropertyId={notePropertyId}
              setIsOpen={setIsOpen}
            />

            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
