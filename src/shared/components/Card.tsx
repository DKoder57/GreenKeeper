// src/shared/components/Card.tsx
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useAppColorScheme } from "@/core/theme";
import type { Theme } from "@/core/theme";

interface CardProps extends ViewProps {
  padded?: boolean;
}

export function Card({ padded = true, style, children, ...viewProps }: CardProps) {
  const { theme } = useAppColorScheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.card, padded && styles.padded, style]} {...viewProps}>
      {children}
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    padded: {
      padding: theme.spacing.md,
    },
  });
}