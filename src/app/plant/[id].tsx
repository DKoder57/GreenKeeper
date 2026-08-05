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
import { useLastFertilizing } from "@/features/plants/hooks/useLastFertilizing";
import { useRegisterFertilizing } from "@/features/plants/hooks/useRegisterFertilizing";
import { useLastPruning } from "@/features/plants/hooks/useLastPruning";
import { useRegisterPruning } from "@/features/plants/hooks/useRegisterPruning";
import { maskDateBR, parseDateBR, formatDateBR } from "@/features/plants/utils/dateBR";

export default function EditPlant() {
  const { theme } = useAppColorScheme();
  const styles = createStyles(theme);
  const { id: idParam } = useLocalSearchParams<{ id: string }>();
  const id = Number(idParam);

  const { plant, isLoading, isError } = usePlant(id);
  const { mutateAsync: updatePlant, isPending: isSaving } = useUpdatePlant();
  const { mutateAsync: deletePlant, isPending: isDeleting } = useDeletePlant();

  const { lastWatering } = useLastWatering(id);
  const { mutateAsync: registerWatering, isPending: isRegisteringWatering } = useRegisterWatering(id);

  const { lastFertilizing } = useLastFertilizing(id);
  const { mutateAsync: registerFertilizing, isPending: isRegisteringFertilizing } = useRegisterFertilizing(id);

  const { lastPruning } = useLastPruning(id);
  const { mutateAsync: registerPruning, isPending: isRegisteringPruning } = useRegisterPruning(id);

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
      await registerWatering(undefined);
    } catch {
      setSubmitError("Não foi possível registrar a rega. Tente novamente.");
    }
  }

  async function handleRegisterFertilizing() {
    try {
      await registerFertilizing(undefined);
    } catch {
      setSubmitError("Não foi possível registrar a adubação. Tente novamente.");
    }
  }

  async function handleRegisterPruning() {
    try {
      await registerPruning(undefined);
    } catch {
      setSubmitError("Não foi possível registrar a poda. Tente novamente.");
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

      <Card style={styles.activityCard}>
        <Text style={styles.activityLabel}>ÚLTIMA REGA</Text>
        <Text style={styles.activityValue}>
          {lastWatering ? formatDateBR(lastWatering.created_at) : "Nunca regada"}
        </Text>
        <Button
          label="Registrar rega"
          variant="secondary"
          onPress={handleRegisterWatering}
          loading={isRegisteringWatering}
        />
      </Card>

      <Card style={styles.activityCard}>
        <Text style={styles.activityLabel}>ÚLTIMA ADUBAÇÃO</Text>
        <Text style={styles.activityValue}>
          {lastFertilizing ? formatDateBR(lastFertilizing.created_at) : "Nunca adubada"}
        </Text>
        <Button
          label="Registrar adubação"
          variant="secondary"
          onPress={handleRegisterFertilizing}
          loading={isRegisteringFertilizing}
        />
      </Card>

      <Card style={styles.activityCard}>
        <Text style={styles.activityLabel}>ÚLTIMA PODA</Text>
        <Text style={styles.activityValue}>
          {lastPruning ? formatDateBR(lastPruning.created_at) : "Nunca podada"}
        </Text>
        <Button
          label="Registrar poda"
          variant="secondary"
          onPress={handleRegisterPruning}
          loading={isRegisteringPruning}
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
    activityCard: {
      gap: theme.spacing.xs,
      marginBottom: theme.spacing.md,
    },
    activityLabel: {
      fontSize: 12,
      fontWeight: "700",
      letterSpacing: 0.5,
      color: theme.colors.textMuted,
      textTransform: "uppercase",
    },
    activityValue: {
      fontSize: 16,
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