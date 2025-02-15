import { handleApiError, postData } from "@/shared/utils/api";

export interface LoginResponse {
  access_token: string; // JWT-токен
  token_type: "bearer"; // Тип токена (в данном случае всегда "bearer")
}

export interface LoginFormData {
  email: string; // Имя пользователя
  password: string; // Пароль
}

// Функция для отправки FormData на /login
export const loginUser = async (
  formData: LoginFormData
): Promise<LoginResponse> => {
  const data = new URLSearchParams();
  data.append("username", formData.email);
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
