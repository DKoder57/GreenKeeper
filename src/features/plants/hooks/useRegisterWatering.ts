// src/features/plants/hooks/useRegisterWatering.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActivityRepository } from "../repository/activity.repository";

export function useRegisterWatering(plantId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notes?: string) =>
      ActivityRepository.registerWatering(plantId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities", "watering", plantId],
      });
    },
  });
}