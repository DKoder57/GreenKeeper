// src/shared/components/Button.tsx
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from "react-native";
import { useAppColorScheme } from "@/core/theme";
import type { Theme } from "@/core/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps extends Omit<PressableProps, "style"> {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  label,
  variant = "primary",
  loading = false,
  disabled = false,
  ...pressableProps
}: ButtonProps) {
  const { theme } = useAppColorScheme();
  const styles = createStyles(theme);
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? theme.colors.primary : theme.colors.surface}
        />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text` as const]]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    base: {
      borderRadius: theme.radius.button,
      paddingVertical: theme.spacing.sm + 4,
      paddingHorizontal: theme.spacing.md,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.primaryMuted,
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    danger: {
      backgroundColor: theme.colors.danger,
    },
    disabled: {
      opacity: 0.5,
    },
    pressed: {
      opacity: 0.85,
    },
    text: {
      fontSize: 16,
      fontWeight: "600",
    },
    primaryText: {
      color: theme.colors.surface,
    },
    secondaryText: {
      color: theme.colors.primary,
    },
    outlineText: {
      color: theme.colors.primary,
    },
    dangerText: {
      color: theme.colors.surface,
    },
  });
}