import { useMutation } from "@tanstack/react-query";
import { PlantRepository } from "../repository/plant.repository";
import { useInvalidatePlants } from "./usePlants";

interface CreatePlantInput {
    name: string;
    species?: string;
    plantedAtIso: string;
}

export function useCreatePlant() {
    const invalidatePlants = useInvalidatePlants();

    return useMutation({
        mutationFn: ({ name, species, plantedAtIso }: CreatePlantInput) => 
            PlantRepository.create(name, species, plantedAtIso),
        onSuccess: () => {
            invalidatePlants();
        }
    });
}

