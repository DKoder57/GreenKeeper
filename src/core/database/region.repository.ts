import { getDatabase } from "./database";
import { Region } from "./types";

export class RegionRepository {
  static async findAll(): Promise<Region[]> {
    const db = await getDatabase();
    return await db.getAllAsync<Region>(
      `SELECT * FROM region ORDER BY name ASC`
    );
  }

  static async findById(id: number): Promise<Region | null> {
    const db = await getDatabase();
    const result = await db.getFirstAsync<Region>(
      `SELECT * FROM region WHERE id = ?`,
      [id]
    );
    return result ?? null;
  }
}