export interface Plant {
    id: number;
    name: string;
    species: string | null;
    created_at: string;    
}

export interface Activity {
    id: number;
    plant_id: number;
    type: string;
    created_at: string;
}