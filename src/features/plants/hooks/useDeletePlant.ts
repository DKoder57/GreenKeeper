// src/features/plants/hooks/useDeletePlant.ts
import { useMutation } from "@tanstack/react-query";
import { PlantRepository } from "../repository/plant.repository";
import { useInvalidatePlants } from "./usePlants";

export function useDeletePlant() {
  const invalidatePlants = useInvalidatePlants();

  return useMutation({
    mutationFn: (id: number) => PlantRepository.delete(id),
    onSuccess: () => {
      invalidatePlants();
    },
  });
}