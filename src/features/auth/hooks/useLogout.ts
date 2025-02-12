import { logout } from "../model/slice";
import { RootState } from "@/app/redux/store";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { removeStorageItem } from "@/shared/lib/storage";
import { logoutUser } from "../api/logoutApi";

// Хук для выхода из системы
export const useLogout = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken); // Получаем токен из Redux

  return useMutation<void, Error>({
    mutationFn: () => logoutUser(accessToken!), // Вызываем logoutUser с токеном
    onSuccess: () => {
      dispatch(logout()); // Деавторизуем пользователя в Redux
      removeStorageItem("accessToken"); // Удаляем токен из AsyncStorage
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
