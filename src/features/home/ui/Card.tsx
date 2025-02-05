import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

interface CardProps {
  imageSource: { uri: string };
  text: string;
}

export const Card: React.FC<CardProps> = ({ imageSource, text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    width: "100%",
    height: 130,
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
