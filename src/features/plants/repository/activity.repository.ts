import { getDatabase } from "@/core/database/database";
import { Activity } from "../types";

export class ActivityRepository {
  static async registerWatering(plantId: number): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO activities (plant_id, type, notes, created_at) VALUES (?, ?, ?, ?)`,
      [plantId, "watering", null, new Date().toISOString()]
    );
  }

  static async findLastWateringByPlantId(
    plantId: number
  ): Promise<Activity | null> {
    const db = await getDatabase();
    const result = await db.getFirstAsync<Activity>(
      `SELECT * FROM activities WHERE plant_id = ? AND type = ? ORDER BY created_at DESC LIMIT 1`,
      [plantId, "watering"]
    );
    return result ?? null;
  }
}
