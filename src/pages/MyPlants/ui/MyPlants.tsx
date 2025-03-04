import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { PlantCard } from "@/features/plantsList";
import {
  usePlants,
  useCreateCard,
  useDeleteCard,
  useUpdateCard,
} from "@/features/plantsList/api/plantsApi";

export const MyPlants = () => {
  const [selected, setSelected] = useState("plants");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePlants();
  const { mutate: createPlant } = useCreateCard();
  const { mutate: deletePlant } = useDeleteCard();
  const { mutate: updatePlant } = useUpdateCard();

  // Состояние для модального окна добавления
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Состояние для модального окна редактирования
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<{
    id: string;
    description: string;
  } | null>(null);

  // Функции для модального окна добавления
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => {
    setIsModalVisible(false);
    setName("");
    setDescription("");
  };
  const handleAddPlant = () => {
    if (name.trim() === "" || description.trim() === "") {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    createPlant({ name, description });
    closeModal();
  };

  // Функции для модального окна редактирования
  const openEditModal = (plant: { id: string; description: string }) => {
    setSelectedPlant(plant);
    setIsEditModalVisible(true);
  };
  const closeEditModal = () => {
    setSelectedPlant(null);
    setIsEditModalVisible(false);
  };
  const handleSaveChanges = () => {
    if (!selectedPlant) return;
    updatePlant({
      id: selectedPlant.id,
      description: selectedPlant.description,
    });
    closeEditModal();
  };
  const handleDeletePlant = () => {
    if (!selectedPlant) return;
    deletePlant(selectedPlant.id);
    closeEditModal();
  };

  // Функция для отрисовки карточек
  const renderPlants = () => {
    if (!data) return null;

    const plants = data.pages.flatMap((page) => page);

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlantCard
            plant={item}
            onPress={() =>
              openEditModal({ id: item.id, description: item.desc })
            }
          />
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          <>
            {isFetchingNextPage && (
              <Text style={styles.loadingText}>Загрузка...</Text>
            )}
          </>
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Модальное окно добавления */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Добавить растение</Text>
            <TextInput
              style={styles.input}
              placeholder="Имя"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Описание"
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButton]}
                onPress={handleAddPlant}
              >
                <Text style={styles.addButtonText}>Добавить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Модальное окно редактирования */}
      <Modal visible={isEditModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Редактировать описание</Text>
            <TextInput
              style={styles.input}
              placeholder="Описание"
              value={selectedPlant?.description || ""}
              onChangeText={(text) =>
                setSelectedPlant((prev) =>
                  prev ? { ...prev, description: text } : null
                )
              }
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDeletePlant}
              >
                <Text style={styles.deleteButtonText}>Удалить</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButton]}
                onPress={handleSaveChanges}
              >
                <Text style={styles.addButtonText}>Сохранить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Переключатель */}
      <View style={styles.switch}>
        <TouchableOpacity
          onPress={() => setSelected("plants")}
          style={[styles.elem, selected === "plants" && styles.selectedElem]}
        >
          <Text style={selected === "plants" && styles.selectedText}>
            Растения
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected("tasks")}
          style={[styles.elem, selected === "tasks" && styles.selectedElem]}
        >
          <Text style={selected === "tasks" && styles.selectedText}>
            Задачи
          </Text>
        </TouchableOpacity>
      </View>

      {/* Заголовок */}
      <Text style={styles.title}>Растения</Text>

      {/* Список растений или сообщение о задачах */}
      {selected === "plants" ? (
        <>
          <TouchableOpacity style={styles.addButton} onPress={openModal}>
            <Text style={styles.addButtonText}>Добавить</Text>
          </TouchableOpacity>
          {renderPlants()}
        </>
      ) : (
        <Text>Задачи пока недоступны</Text>
      )}
    </View>
  );
};

export default MyPlants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  switch: {
    marginTop: 37,
    flexDirection: "row",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 8,
    gap: 8,
  },
  elem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  selectedElem: {
    backgroundColor: "#66B88E",
  },
  selectedText: {
    color: "#fff",
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 12,
  },
  list: {
    width: "100%",
    borderRadius: 8,
  },
  loadingText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    color: "#666",
  },
  addButton: {
    height: 50,
    width: "100%",
    backgroundColor: "#66B88E",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginHorizontal: 4,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#66B88E",
  },
  deleteButton: {
    height: 50,
    backgroundColor: "#FF4D4D",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
