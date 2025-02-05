import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://665730a89f970b3b36c84dc4.mockapi.io/",
  timeout: 10000, // таймаут для запросов (например, 10 секунд)
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchData = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Обработчик ошибок
export const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    // Обрабатываем ошибку от Axios
    console.error("API Error: ", error.response?.data || error.message);
  } else {
    // Общая обработка ошибок
    console.error("Unexpected error: ", error);
  }
};
