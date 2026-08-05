// src/features/plants/hooks/useLastFertilizing.ts
import { useQuery } from "@tanstack/react-query";
import { ActivityRepository } from "../repository/activity.repository";

export function useLastFertilizing(plantId: number) {
  const query = useQuery({
    queryKey: ["activities", "fertilizing", plantId],
    queryFn: () => ActivityRepository.findLastFertilizingByPlantId(plantId),
    enabled: !Number.isNaN(plantId),
  });

  return {
    lastFertilizing: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}