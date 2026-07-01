import { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";

import { Plant } from "@/features/plants/types";
import { PlantRepository } from "@/features/plants/repository/plant.repository";

export default function Dashboard() {
  const [plants, setPlants] = useState<Plant[]>([]);

  async function loadPlants() {
    const data = await PlantRepository.findAll();
    setPlants(data);
  }

  async function handleCreate() {
    await PlantRepository.create(
      `Planta ${Date.now()}`,
      "Teste"
    );

    await loadPlants();
  }

  useEffect(() => {
    loadPlants();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="Adicionar Planta"
        onPress={handleCreate}
      />

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.name} - {item.species}
          </Text>
        )}
      />
    </View>
  );
}