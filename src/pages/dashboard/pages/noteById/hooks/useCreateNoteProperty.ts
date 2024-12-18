import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { CreateNotePropertyRequestDto } from "../types/createNotePropertyRequest.dto";
import { createNotePropertyApi } from "../api/createNotePropertyApi";

export function useCreateNoteProperty(noteId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createNoteProperty", noteId],
    mutationFn: (noteData: CreateNotePropertyRequestDto) =>
      createNotePropertyApi(noteData),
    onSuccess: () => {
      toast.success("Note property created successfully", {
        description: "Your note property has been created successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: ["getNote", noteId],
        exact: true,
      });
    },
    onError: (error) => {
      toast.error("Note property creation failed", {
        description: `${error.message}`,
      });
      throw error;
    },
  });
}
