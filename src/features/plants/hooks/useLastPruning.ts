// src/features/plants/hooks/useLastPruning.ts
import { useQuery } from "@tanstack/react-query";
import { ActivityRepository } from "../repository/activity.repository";

export function useLastPruning(plantId: number) {
  const query = useQuery({
    queryKey: ["activities", "pruning", plantId],
    queryFn: () => ActivityRepository.findLastPruningByPlantId(plantId),
    enabled: !Number.isNaN(plantId),
  });

  return {
    lastPruning: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}