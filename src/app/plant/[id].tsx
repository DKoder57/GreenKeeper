// src/app/plant/[id].tsx
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Card, Input, ConfirmModal } from "@/shared/components";
import { useAppColorScheme } from "@/core/theme";
import type { Theme } from "@/core/theme";
import { usePlant } from "@/features/plants/hooks/usePlant";
import { useUpdatePlant } from "@/features/plants/hooks/useUpdatePlant";
import { useDeletePlant } from "@/features/plants/hooks/useDeletePlant";
import { useLastWatering } from "@/features/plants/hooks/useLastWatering";
import { useRegisterWatering } from "@/features/plants/hooks/useRegisterWatering";
import { maskDateBR, parseDateBR, formatDateBR } from "@/features/plants/utils/dateBR";

export default function EditPlant() {
  const { theme } = useAppColorScheme();
  const styles = createStyles(theme);
  const { id: idParam } = useLocalSearchParams<{ id: string }>();
  const id = Number(idParam);

  const { plant, isLoading, isError } = usePlant(id);
  const { mutateAsync: updatePlant, isPending: isSaving } = useUpdatePlant();
  const { mutateAsync: deletePlant, isPending: isDeleting } = useDeletePlant();
  const { lastWatering, isLoading: isLoadingWatering } = useLastWatering(id);
  const { mutateAsync: registerWatering, isPending: isRegisteringWatering } =
    useRegisterWatering(id);

  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [plantedAt, setPlantedAt] = useState("");
  const [errors, setErrors] = useState<{ name?: string; plantedAt?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  useEffect(() => {
    if (plant) {
      setName(plant.name);
      setSpecies(plant.species ?? "");
      setPlantedAt(formatDateBR(plant.created_at));
    }
  }, [plant]);

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
      await updatePlant({
        id,
        name: name.trim(),
        species: species.trim() || undefined,
        plantedAtIso: (parsedDate as { iso: string }).iso,
      });
      router.back();
    } catch {
      setSubmitError("Não foi possível salvar as alterações. Tente novamente.");
    }
  }

  async function handleDelete() {
    try {
      await deletePlant(id);
      setConfirmVisible(false);
      router.back();
    } catch {
      setConfirmVisible(false);
      setSubmitError("Não foi possível excluir a planta. Tente novamente.");
    }
  }

  async function handleRegisterWatering() {
    try {
      await registerWatering();
    } catch {
      setSubmitError("Não foi possível registrar a rega. Tente novamente.");
    }
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError || !plant) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Planta não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Editar planta</Text>

      <Card style={styles.wateringCard}>
        <Text style={styles.wateringLabel}>Última rega</Text>
        <Text style={styles.wateringValue}>
          {isLoadingWatering
            ? "Carregando..."
            : lastWatering
              ? formatDateBR(lastWatering.created_at)
              : "Nunca regada"}
        </Text>
        <Button
          label="Registrar rega"
          variant="secondary"
          onPress={handleRegisterWatering}
          loading={isRegisteringWatering}
        />
      </Card>

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

        <Button label="Salvar alterações" variant="primary" onPress={handleSave} loading={isSaving} />
        <Button
          label="Excluir planta"
          variant="danger"
          onPress={() => setConfirmVisible(true)}
          disabled={isSaving}
        />
      </Card>

      <ConfirmModal
        visible={confirmVisible}
        title="Excluir planta"
        description={`Tem certeza que deseja excluir "${plant.name}"? Essa ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        destructive
        loading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmVisible(false)}
      />
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
    wateringCard: {
      gap: theme.spacing.xs,
      marginBottom: theme.spacing.md,
    },
    wateringLabel: {
      fontSize: 13,
      color: theme.colors.textMuted,
      textTransform: "uppercase",
    },
    wateringValue: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    card: {
      gap: theme.spacing.sm,
    },
    submitError: {
      color: theme.colors.danger,
      fontSize: 13,
      marginBottom: theme.spacing.xs,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: {
      color: theme.colors.textMuted,
    },
  });
}