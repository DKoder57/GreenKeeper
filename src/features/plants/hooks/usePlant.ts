// src/features/plants/hooks/usePlant.ts
import { useQuery } from "@tanstack/react-query";
import { PlantRepository } from "../repository/plant.repository";

export function usePlant(id: number) {
  const query = useQuery({
    queryKey: ["plants", id],
    queryFn: () => PlantRepository.findById(id),
    enabled: !Number.isNaN(id),
  });

  return {
    plant: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}