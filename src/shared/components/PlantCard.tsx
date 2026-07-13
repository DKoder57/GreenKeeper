// src/features/plants/components/PlantCard.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "@/shared/components";
import { useAppColorScheme } from "@/core/theme";
import type { Theme } from "@/core/theme";
import type { Plant } from "../../features/plants/types.ts";

interface PlantCardProps {
  plant: Plant;
  onPress?: (plant: Plant) => void;
}

export function PlantCard({ plant, onPress }: PlantCardProps) {
  const { theme } = useAppColorScheme();
  const styles = createStyles(theme);

  return (
    <Card onTouchEnd={() => onPress?.(plant)}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.name}>{plant.name}</Text>
          {plant.species ? (
            <Text style={styles.species}>{plant.species}</Text>
          ) : null}
        </View>
        <Text style={styles.date}>
          {new Date(plant.created_at).toLocaleDateString("pt-BR")}
        </Text>
      </View>
    </Card>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    info: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
    },
    species: {
      fontSize: 13,
      color: theme.colors.textMuted,
      marginTop: 2,
    },
    date: {
      fontSize: 12,
      color: theme.colors.textMuted,
      marginLeft: theme.spacing.sm,
    },
  });
}