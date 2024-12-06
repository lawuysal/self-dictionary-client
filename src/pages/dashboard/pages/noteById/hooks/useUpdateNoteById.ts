import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateNoteRequestDto } from "../types/updateNoteRequest.dto";
import { updateNoteApi } from "../api/updateNoteApi";

export function useUpdateNote(noteId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updatenote", noteId],
    mutationFn: (noteData: UpdateNoteRequestDto) =>
      updateNoteApi(noteId, noteData),
    onSuccess: () => {
      toast({
        title: "Note updated successfully",
        description: "Your note has been updated successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: ["getNotesByLanguageId"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["getNote"],
        exact: false,
      });
    },
    onError: (error) => {
      toast({
        title: "Note update failed",
        description: `${error.message}`,
        variant: "destructive",
      });
      throw error;
    },
  });
}
