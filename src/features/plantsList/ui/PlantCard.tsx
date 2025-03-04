import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

interface PlantCardProps {
  plant: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
  onPress?: () => void;
}

export const PlantCard = ({ plant, onPress }: PlantCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: plant.image }} style={styles.image} />
      <View style={{ marginLeft: 16 }}>
        <Text style={styles.name}>{plant.name}</Text>
        <Text style={styles.desc}>{plant.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 138,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    flexDirection: "row",
  },
  image: {
    height: 57,
    width: 57,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  desc: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
