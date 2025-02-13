import { handleApiError, postData } from "@/shared/utils/api";

export interface SignupResponse {
  message: string; // Сообщение об успешной регистрации
}

export interface SignupFormData {
  email: string; // Электронная почта
  login: string; // Логин пользователя
  password: string; // Пароль
}

// Функция для отправки FormData на /auth/signup
export const signupUser = async (
  formData: SignupFormData
): Promise<SignupResponse> => {
  const data = new FormData();
  data.append("email", formData.email);
  data.append("login", formData.login);
  data.append("password", formData.password);

  try {
    return await postData("/auth/signup", data, {
      "Content-Type": "multipart/form-data",
    });
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
