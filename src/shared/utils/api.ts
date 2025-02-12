import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Первый экземпляр axios с первым baseURL
const axiosInstance1: AxiosInstance = axios.create({
  baseURL: "https://d5drmanskpnak11q18rg.g3ab4gln.apigw.yandexcloud.net",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Второй экземпляр axios с вторым baseURL
const axiosInstance2: AxiosInstance = axios.create({
  baseURL: "https://665730a89f970b3b36c84dc4.mockapi.io",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Функция для GET-запроса с выбором экземпляра axios
export const fetchData = async (
  endpoint: string,
  useSecondInstance: boolean = false
) => {
  const instance = useSecondInstance ? axiosInstance2 : axiosInstance1;
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Функция для POST-запроса с выбором экземпляра axios
export const postData = async (
  endpoint: string,
  data: any,
  headers?: Record<string, string>,
  useSecondInstance: boolean = false
) => {
  const instance = useSecondInstance ? axiosInstance2 : axiosInstance1;
  try {
    const response = await instance.post(endpoint, data, { headers });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Функция для PUT-запроса с выбором экземпляра axios
export const updateData = async (
  endpoint: string,
  data: any,
  useSecondInstance: boolean = false
) => {
  const instance = useSecondInstance ? axiosInstance2 : axiosInstance1;
  try {
    const response = await instance.put(endpoint, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Функция для DELETE-запроса с выбором экземпляра axios
export const deleteData = async (
  endpoint: string,
  useSecondInstance: boolean = false
) => {
  const instance = useSecondInstance ? axiosInstance2 : axiosInstance1;
  try {
    const response = await instance.delete(endpoint);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Обработчик ошибок
export const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error("API Error: ", error.response?.data || error.message);
  } else {
    console.error("Unexpected error: ", error);
  }
};
