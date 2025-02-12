import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";
import {
  useCards,
  useDeleteCard,
  useCreateCard,
  useUpdateCard,
} from "@/features/home/api/homeApi"; // Добавляем useUpdateCard
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
  const { mutate: deleteCard } = useDeleteCard(); // Используем хук удаления
  const { mutate: createCard } = useCreateCard(); // Используем хук создания карточки
  const { mutate: updateCard } = useUpdateCard(); // Используем хук обновления карточки
  const [newCardName, setNewCardName] = useState(""); // Состояние для имени новой карточки

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleAddCard = () => {
    if (!newCardName.trim()) {
      alert("Введите название карточки");
      return;
    }
    createCard(newCardName); // Создаем новую карточку
    setNewCardName(""); // Очищаем поле ввода
  };

  const handleEditCard = (cardId: string, newText: string) => {
    updateCard({ id: cardId, name: newText }); // Обновляем карточку
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
      {/* Поле для ввода названия новой карточки */}
      <View style={styles.addCardContainer}>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: theme.text }]}
          placeholder="Введите название карточки"
          placeholderTextColor={theme.text}
          value={newCardName}
          onChangeText={setNewCardName}
        />
        <Button title="Добавить карточку" onPress={handleAddCard} />
      </View>

      {/* Список карточек */}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            imageSource={{ uri: item.avatar }}
            text={item.name}
            onDelete={() => deleteCard(item.id)}
            onEdit={(newText) => handleEditCard(item.id, newText)} // Передаём функцию редактирования
          />
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
  addCardContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default Home;
