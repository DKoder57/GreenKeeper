// src/features/plants/hooks/useRegisterFertilizing.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActivityRepository } from "../repository/activity.repository";

export function useRegisterFertilizing(plantId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notes?: string) =>
      ActivityRepository.registerFertilizing(plantId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities", "fertilizing", plantId],
      });
    },
  });
}