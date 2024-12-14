import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { CreateNoteRequestDto } from "../types/createNoteRequest.dto";
import { createNoteApi } from "../api/createNoteApi";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateNote() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createNote"],
    mutationFn: (noteData: CreateNoteRequestDto) => createNoteApi(noteData),
    onSuccess: () => {
      toast({
        title: "Note created successfully",
        description: "Your note has been created successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: ["getNotesByLanguageId"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["getLanguageNoteCountsById"],
        exact: false,
      });
    },
    onError: (error) => {
      toast({
        title: "Note creation failed",
        description: `${error.message}`,
        variant: "destructive",
      });
      throw error;
    },
  });
}
