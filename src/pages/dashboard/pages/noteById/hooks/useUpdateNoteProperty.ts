import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateNotePropertyApi } from "../api/updateNotePropertyApi";
import { UpdateNotePropertyRequestDto } from "../types/updateNotePropertyRequest.dto";

export function useUpdateNoteProperty(notePropertyId: string, noteId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateNoteProperty", notePropertyId],
    mutationFn: (noteData: UpdateNotePropertyRequestDto) =>
      updateNotePropertyApi(noteData),
    onSuccess: () => {
      toast.success("Note property updated successfully", {
        description: "Your note property has been updated successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: ["getNote", noteId],
        exact: true,
      });
    },
    onError: (error) => {
      toast.error("Note update failed", { description: `${error.message}` });
      throw error;
    },
  });
}
