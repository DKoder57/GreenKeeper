import * as SQLite from "expo-sqlite";

export async function getDatabase() {
    return await SQLite.openDatabaseAsync("greenkeeper.db");
}