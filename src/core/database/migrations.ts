import { getDatabase } from "./database";
import {
  CREATE_PLANTS_TABLE,
  CREATE_ACTIVITIES_TABLE,
} from "./schema";

export async function runMigrations() {
  const database = await getDatabase();

  await database.execAsync(`
    ${CREATE_PLANTS_TABLE}
    ${CREATE_ACTIVITIES_TABLE}
  `);
}