import { getDatabase } from "@/core/database/database";
import { Plant } from "../types";

export class PlantRepository {
  static async create(name: string, species?: string): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO plants (name, species, created_at) VALUES (?, ?, ?)`,
      [name, species ?? null, new Date().toISOString()]
    );
  }

  static async findAll(): Promise<Plant[]> {
    const db = await getDatabase();
    return await db.getAllAsync<Plant>(
      `SELECT * FROM plants ORDER BY created_at DESC`
    );
  }

  static async delete(id: number): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM plants WHERE id = ?`, [id]);
  }
}