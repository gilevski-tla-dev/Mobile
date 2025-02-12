import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Button,
} from "react-native";

interface CardProps {
  imageSource: { uri: string };
  text: string;
  onDelete: () => void; // Пропс для обработки удаления
  onEdit: (newText: string) => void; // Пропс для обработки редактирования
}

export const Card: React.FC<CardProps> = ({
  imageSource,
  text,
  onDelete,
  onEdit,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для отображения модального окна
  const [newText, setNewText] = useState(text); // Состояние для нового текста

  const handleCardPress = () => {
    setIsModalVisible(true); // Открываем модальное окно
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Закрываем модальное окно
  };

  const handleSave = () => {
    onEdit(newText); // Вызываем функцию редактирования с новым текстом
    setIsModalVisible(false); // Закрываем модальное окно
  };

  return (
    <View>
      {/* Карточка */}
      <TouchableOpacity onPress={handleCardPress} style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
        </View>
        <Text style={styles.text}>{text}</Text>

        {/* Кнопка для удаления */}
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Удалить</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Модальное окно */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={imageSource} style={styles.modalImage} />
            <TextInput
              style={styles.input}
              value={newText}
              onChangeText={setNewText}
              placeholder="Введите новый текст"
            />
            <View style={styles.buttonContainer}>
              <Button title="Сохранить" onPress={handleSave} />
              <Button title="Закрыть" onPress={handleCloseModal} />
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: "space-between", // Распределяем пространство между элементами
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
    flex: 1, // Текст занимает доступное пространство
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Полупрозрачный фон
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default Card;
