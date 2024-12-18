import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDeleteNotePropertyById } from "../hooks/useDeleteNotePropertyById";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function NotePropertyDeletingDialog({
  notePropertyId,
  noteId,
  setIsOpen,
}: {
  notePropertyId: string;
  noteId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const deleteNotePropertyMutation = useDeleteNotePropertyById(
    notePropertyId,
    noteId,
  );

  function handleDelete() {
    deleteNotePropertyMutation.mutate();
  }

  useEffect(() => {
    if (deleteNotePropertyMutation.isSuccess) {
      setIsOpen(false);
      deleteNotePropertyMutation.reset();
    }
  }, [deleteNotePropertyMutation, setIsOpen]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Are you sure to delete this note property?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this note
            property.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
