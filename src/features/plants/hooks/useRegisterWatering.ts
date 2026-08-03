import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActivityRepository } from "../repository/activity.repository";
 
export function useRegisterWatering(plantId: number) {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: () => ActivityRepository.registerWatering(plantId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities", "watering", plantId],
      });
    },
  });
}