import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PlantRepository } from "../../features/plants/repository/plant.repository";

export const plantsQueryKey = ["plants"] as const;

export function usePlants() {
    const query = useQuery({
        queryKey: plantsQueryKey,
        queryFn: () => PlantRepository.findAll(),
    });
    return {
        plants: query.data ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: query.refetch,
    };
}

/**
 * Utilitário para invalidar lista de plantas após Create/Delete.
 */
export function useInvalidatePlants() {
    const queryClient = useQueryClient();
    return () => queryClient.invalidateQueries({ queryKey: plantsQueryKey });
}