import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://d5drmanskpnak11q18rg.g3ab4gln.apigw.yandexcloud.net",
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

// Функция для POST-запроса
export const postData = async (
  endpoint: string,
  data: any,
  headers?: Record<string, string>
) => {
  try {
    const response = await axiosInstance.post(endpoint, data, { headers });
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
