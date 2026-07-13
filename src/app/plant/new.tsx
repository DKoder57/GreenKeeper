// src/app/plant/new.tsx
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { Button, Card, Input } from "@/shared/components";
import { useAppColorScheme } from "@/core/theme";
import type { Theme } from "@/core/theme";
import { useCreatePlant } from "@/features/plants/hooks/useCreatePlant";
import { maskDateBR, parseDateBR } from "@/features/plants/utils/dateBR";

export default function NewPlant() {
  const { theme } = useAppColorScheme();
  const styles = createStyles(theme);
  const { mutateAsync, isPending } = useCreatePlant();

  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [plantedAt, setPlantedAt] = useState("");

  const [errors, setErrors] = useState<{ name?: string; plantedAt?: string }>(
    {}
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleDateChange(value: string) {
    setPlantedAt(maskDateBR(value));
  }

  async function handleSave() {
    setSubmitError(null);
    const nextErrors: typeof errors = {};

    if (!name.trim()) {
      nextErrors.name = "Informe o nome da planta";
    }

    const parsedDate = parseDateBR(plantedAt);
    if ("error" in parsedDate) {
      nextErrors.plantedAt = parsedDate.error;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    try {
      await mutateAsync({
        name: name.trim(),
        species: species.trim() || undefined,
        plantedAtIso: (parsedDate as { iso: string }).iso,
      });
      router.back();
    } catch {
      setSubmitError("Não foi possível salvar a planta. Tente novamente.");
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Cadastrar planta</Text>

      <Card style={styles.card}>
        <Input
          label="Nome da planta"
          placeholder="Ex: Jabuticaba"
          value={name}
          onChangeText={setName}
          error={errors.name}
        />
        <Input
          label="Espécie (opcional)"
          placeholder="Ex: Plinia cauliflora"
          value={species}
          onChangeText={setSpecies}
        />
        <Input
          label="Data de plantio"
          placeholder="DD/MM/AAAA"
          keyboardType="number-pad"
          value={plantedAt}
          onChangeText={handleDateChange}
          maxLength={10}
          error={errors.plantedAt}
        />

        {submitError ? (
          <Text style={styles.submitError}>{submitError}</Text>
        ) : null}

        <Button
          label="Salvar"
          variant="primary"
          onPress={handleSave}
          loading={isPending}
        />
      </Card>
    </ScrollView>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.md,
    },
    heading: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    card: {
      gap: theme.spacing.sm,
    },
    submitError: {
      color: theme.colors.danger,
      fontSize: 13,
      marginBottom: theme.spacing.xs,
    },
  });
}