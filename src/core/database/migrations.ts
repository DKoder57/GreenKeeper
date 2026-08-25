import { getDatabase } from "./database";
import {
  CREATE_PLANTS_TABLE,
  CREATE_ACTIVITIES_TABLE,
  CREATE_REGION_TABLE,
  SEED_REGION_TABLE,
} from "./schema";

export async function runMigrations() {
  const database = await getDatabase();
  await database.execAsync(CREATE_PLANTS_TABLE);
  await database.execAsync(CREATE_ACTIVITIES_TABLE);
  await database.execAsync(CREATE_REGION_TABLE);
  await database.execAsync(SEED_REGION_TABLE);
}

console.log("Running migrations...");