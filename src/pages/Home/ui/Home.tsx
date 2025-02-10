import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useCards } from "@/features/home/api/homeApi";
import { Card } from "@/features/home";
import { useTheme } from "@/app/providers/ThemeProvider";

export const Home = () => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCards();
  const { theme } = useTheme();

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  if (error instanceof Error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Ошибка: {error.message}</Text>
      </View>
    );
  }

  // Объединяем все страницы в один массив
  const cards = data?.pages.flat() || [];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={styles.mainText}>Домашняя страница</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card imageSource={{ uri: item.avatar }} text={item.name} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              size="large"
              color={theme.text}
              style={styles.loader}
            />
          ) : null
        }
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  loader: {
    marginVertical: 20, // отступ для индикатора загрузки
  },
});

export default Home;
