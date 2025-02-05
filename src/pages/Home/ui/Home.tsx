import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useCards } from "@/features/home/api/homeApi";
import { Card } from "@/features/home";

export const Home = () => {
  const { data, error, isLoading } = useCards();

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error instanceof Error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Домашняя страница</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card imageSource={{ uri: item.avatar }} text={item.name} />
        )}
        // разделитель между элементами
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    width: "100%",
  },
  separator: {
    height: 20, // отступ между карточками
  },
});

export default Home;
