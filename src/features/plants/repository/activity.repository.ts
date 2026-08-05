// src/features/plants/repository/activity.repository.ts
import { getDatabase } from "@/core/database/database";
import { Activity } from "../types";

type ActivityType = Activity["type"];

export class ActivityRepository {
  private static async register(
    plantId: number,
    type: ActivityType,
    notes?: string
  ): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO activities (plant_id, type, notes, created_at) VALUES (?, ?, ?, ?)`,
      [plantId, type, notes ?? null, new Date().toISOString()]
    );
  }

  private static async findLastByPlantId(
    plantId: number,
    type: ActivityType
  ): Promise<Activity | null> {
    const db = await getDatabase();
    const result = await db.getFirstAsync<Activity>(
      `SELECT * FROM activities WHERE plant_id = ? AND type = ? ORDER BY created_at DESC LIMIT 1`,
      [plantId, type]
    );
    return result ?? null;
  }

  static registerWatering(plantId: number, notes?: string): Promise<void> {
    return ActivityRepository.register(plantId, "watering", notes);
  }

  static findLastWateringByPlantId(plantId: number): Promise<Activity | null> {
    return ActivityRepository.findLastByPlantId(plantId, "watering");
  }

  static registerFertilizing(plantId: number, notes?: string): Promise<void> {
    return ActivityRepository.register(plantId, "fertilizing", notes);
  }

  static findLastFertilizingByPlantId(plantId: number): Promise<Activity | null> {
    return ActivityRepository.findLastByPlantId(plantId, "fertilizing");
  }
}