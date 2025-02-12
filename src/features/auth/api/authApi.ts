import { handleApiError, postData } from "@/shared/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../model/slice";

interface LoginResponse {
  access_token: string; // JWT-токен
  token_type: "bearer"; // Тип токена (в данном случае всегда "bearer")
}

interface LoginFormData {
  username: string; // Имя пользователя
  password: string; // Пароль
}

// Функция для отправки FormData на /login
export const loginUser = async (
  formData: LoginFormData
): Promise<LoginResponse> => {
  const data = new URLSearchParams();
  data.append("username", formData.username);
  data.append("password", formData.password);

  try {
    return await postData("/auth/login", data, {
      "Content-Type": "application/x-www-form-urlencoded",
    });
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Хук для авторизации
export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation<LoginResponse, Error, LoginFormData>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      dispatch(login(data.access_token)); // Сохраняем токен в Redux
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
