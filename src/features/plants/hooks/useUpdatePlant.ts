// src/features/plants/hooks/useUpdatePlant.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlantRepository } from "../repository/plant.repository";
import { useInvalidatePlants } from "./usePlants";

interface UpdatePlantInput {
  id: number;
  name: string;
  species?: string;
  plantedAtIso: string;
}

export function useUpdatePlant() {
  const invalidatePlants = useInvalidatePlants();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name, species, plantedAtIso }: UpdatePlantInput) =>
      PlantRepository.update(id, name, species, plantedAtIso),
    onSuccess: (_data, variables) => {
      invalidatePlants();
      queryClient.invalidateQueries({ queryKey: ["plants", variables.id] });
    },
  });
}