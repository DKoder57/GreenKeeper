// src/features/plants/hooks/useRegisterPruning.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActivityRepository } from "../repository/activity.repository";

export function useRegisterPruning(plantId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notes?: string) =>
      ActivityRepository.registerPruning(plantId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities", "pruning", plantId],
      });
    },
  });
}