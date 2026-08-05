import { Stack } from "expo-router";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { runMigrations } from "../core/database/migrations";
import { QueryProvider } from "../core/query/QueryProvider";
import { initNotificationsAsync } from "../core/notifications/notificationsService";
 
export default function RootLayout() {
  const [ready, setReady] = useState(false);
 
  useEffect(() => {
    runMigrations()
      .then(() => setReady(true))
      .catch((error) => console.error("Error executing migrations:", error));

    initNotificationsAsync().catch((error) =>
      console.error("Error initializing notifications:", error)
    );
  }, []);
 
  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
 
  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryProvider>
  );
}