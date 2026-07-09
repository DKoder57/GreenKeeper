// src/app/dev-preview.tsx
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Card, Input, EmptyState } from "@/shared/components";
import { useAppColorScheme } from "@/core/theme";
import type { Theme } from "@/core/theme";

export default function DevPreview() {
  const { theme, isDark, toggleColorScheme } = useAppColorScheme();
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const styles = createStyles(theme);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.heading}>Dev Preview</Text>
        <Button
          label={isDark ? "Modo claro" : "Modo escuro"}
          variant="outline"
          onPress={toggleColorScheme}
        />
      </View>

      <Text style={styles.sectionTitle}>Button</Text>
      <Card style={styles.section}>
        <View style={styles.row}>
          <Button label="Primary" variant="primary" onPress={() => {}} />
        </View>
        <View style={styles.row}>
          <Button label="Secondary" variant="secondary" onPress={() => {}} />
        </View>
        <View style={styles.row}>
          <Button label="Outline" variant="outline" onPress={() => {}} />
        </View>
        <View style={styles.row}>
          <Button label="Danger" variant="danger" onPress={() => {}} />
        </View>
        <View style={styles.row}>
          <Button
            label="Loading"
            variant="primary"
            loading={loading}
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1500);
            }}
          />
        </View>
        <View style={styles.row}>
          <Button label="Disabled" variant="primary" disabled onPress={() => {}} />
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Card</Text>
      <Card style={styles.section}>
        <Text style={styles.cardText}>
          Este é um Card com padding e borda padrão do tema.
        </Text>
      </Card>

      <Text style={styles.sectionTitle}>Input</Text>
      <Card style={styles.section}>
        <Input
          label="Nome da planta"
          placeholder="Ex: Jabuticaba"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <View style={styles.spacer} />
        <Input
          label="Campo com erro"
          placeholder="Digite algo"
          error="Este campo é obrigatório"
        />
      </Card>

      <Text style={styles.sectionTitle}>EmptyState</Text>
      <Card style={styles.section} padded={false}>
        <EmptyState
          title="Nenhuma planta cadastrada"
          description="Adicione sua primeira planta para começar a acompanhar o crescimento."
          actionLabel="Adicionar planta"
          onAction={() => {}}
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
      paddingBottom: theme.spacing.xl,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.lg,
    },
    heading: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.colors.text,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.textMuted,
      marginBottom: theme.spacing.xs,
      marginTop: theme.spacing.md,
      textTransform: "uppercase",
    },
    section: {
      gap: theme.spacing.sm,
    },
    row: {
      marginBottom: theme.spacing.xs,
    },
    cardText: {
      color: theme.colors.text,
      fontSize: 15,
    },
    spacer: {
      height: theme.spacing.sm,
    },
  });
}