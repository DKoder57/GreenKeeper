// src/app/(tabs)/index.tsx
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Button, EmptyState } from "@/shared/components";
import { PlantCard } from "../../shared/components/PlantCard";
import { usePlants } from "../../features/plants/hooks/usePlants";
import { useAppColorScheme } from "@/core/theme";
import type { Theme } from "@/core/theme";
import type { Plant } from "@/features/plants/types";

export default function Home() {
  const { theme } = useAppColorScheme();
  const { plants, isLoading, isError, refetch } = usePlants();
  const styles = createStyles(theme);

  function handleAddPlant() {
    // Tela de cadastro será implementada em uma próxima task.
    router.push("/plant/new");
  }

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <Text style={styles.loadingText}>Carregando plantas...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.screen}>
        <EmptyState
          title="Não foi possível carregar suas plantas"
          description="Verifique e tente novamente."
          actionLabel="Tentar novamente"
          onAction={() => refetch()}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.heading}>Minhas Plantas</Text>
        <Button label="Adicionar" variant="primary" onPress={handleAddPlant} />
      </View>

      {__DEV__ && (
        <Button
          label="Dev Preview"
          variant="outline"
          onPress={() => router.push("/dev-preview")}
        />
      )}

      {plants.length === 0 ? (
        <EmptyState
          title="Nenhuma planta cadastrada"
          description="Adicione sua primeira planta para começar a acompanhar o crescimento."
          actionLabel="Adicionar planta"
          onAction={handleAddPlant}
        />
      ) : (
        <FlatList
          data={plants}
          keyExtractor={(item: Plant) => String(item.id)}
          renderItem={({ item }) => <PlantCard plant={item} />}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.md,
    },
    heading: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.colors.text,
    },
    list: {
      paddingBottom: theme.spacing.xl,
    },
    separator: {
      height: theme.spacing.sm,
    },
    loadingText: {
      color: theme.colors.textMuted,
      textAlign: "center",
      marginTop: theme.spacing.xl,
    },
  });
}