import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deleteNotePropertyById } from "../api/deleteNotePropertyByIdApi";

export function useDeleteNotePropertyById(
  notePropertyId: string,
  noteId: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteNoteProperty", notePropertyId],
    mutationFn: () => deleteNotePropertyById(notePropertyId),
    onSuccess: () => {
      toast.success("Note property deleted", {
        description: "Your note property has been deleted successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: ["getNote", noteId],
        exact: true,
      });
    },
    onError: (error) => {
      toast.error("Note property deletion failed", {
        description: `${error.message}`,
      });
      throw error;
    },
  });
}
