// src/shared/components/EmptyState.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppColorScheme } from "@/core/theme";
import type { Theme } from "@/core/theme";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { theme } = useAppColorScheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {actionLabel && onAction ? (
        <View style={styles.action}>
          <Button label={actionLabel} onPress={onAction} variant="secondary" />
        </View>
      ) : null}
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.lg,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.text,
      textAlign: "center",
    },
    description: {
      fontSize: 14,
      color: theme.colors.textMuted,
      textAlign: "center",
      marginTop: theme.spacing.xs,
    },
    action: {
      marginTop: theme.spacing.md,
    },
  });
}