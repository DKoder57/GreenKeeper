import { Stack } from "expo-router";
import { useEffect } from "react";
import { runMigrations } from "../core/database/migrations";

export default function RootLayout() {
    useEffect(() => {
        runMigrations()
        .then(() => console.log("Migrations executed successfully."))
        .catch((error) => console.error("Error executing migrations:", error));
    }, []);
       
    return <Stack screenOptions={{ headerShown: false }} />;
}
