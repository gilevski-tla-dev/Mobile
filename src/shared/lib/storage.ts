import AsyncStorage from "@react-native-async-storage/async-storage";

// Сохранить значение по ключу
export const setStorageItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving to AsyncStorage:", error);
  }
};

// Получить значение по ключу
export const getStorageItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error("Error reading from AsyncStorage:", error);
    return null;
  }
};

// Удалить значение по ключу
export const removeStorageItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from AsyncStorage:", error);
  }
};
