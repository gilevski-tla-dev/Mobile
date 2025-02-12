import { handleApiError, postData } from "@/shared/utils/api";


// Функция для отправки запроса на /logout
export const logoutUser = async (accessToken: string): Promise<void> => {
  try {
    await postData("/auth/logout", null, {
      Authorization: `Bearer ${accessToken}`, // Передаем токен в заголовке
    });
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


