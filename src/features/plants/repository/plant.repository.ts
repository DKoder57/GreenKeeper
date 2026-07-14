import { getDatabase } from "@/core/database/database";
import { Plant } from "../types";

export class PlantRepository {
  static async create(
    name: string,
    species: string | undefined,
    plantedAt: string
  ): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO plants (name, species, created_at) VALUES (?, ?, ?)`,
      [name, species ?? null, plantedAt]
    );
  }

  static async findAll(): Promise<Plant[]> {
    const db = await getDatabase();
    return await db.getAllAsync<Plant>(
      `SELECT * FROM plants ORDER BY created_at DESC`
    );
  }

  static async findById(id: number): Promise<Plant | null> {
    const db = await getDatabase();
    const result = await db.getFirstAsync<Plant>(
      `SELECT * FROM plants WHERE id = ?`,
      [id]
    );
    return result ?? null;
  }

  static async update(
    id: number,
    name: string,
    species: string | undefined,
    plantedAt: string
  ): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      `UPDATE plants SET name = ?, species = ?, created_at = ? WHERE id = ?`,
      [name, species ?? null, plantedAt, id]
    );
  }

  static async delete(id: number): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(`DELETE FROM plants WHERE id = ?`, [id]);
  }
}