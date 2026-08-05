import { useQuery } from "@tanstack/react-query";
import { ActivityRepository } from "../repository/activity.repository";
 
export function useLastWatering(plantId: number) {
  const query = useQuery({
    queryKey: ["activities", "watering", plantId],
    queryFn: () => ActivityRepository.findLastWateringByPlantId(plantId),
    enabled: !Number.isNaN(plantId),
  });
 
  return {
    lastWatering: query.data ?? null,
    isLoading: query.isLoading,
  };
}