import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../model/slice";
import { setStorageItem } from "@/shared/lib/storage";
import { LoginFormData, LoginResponse, loginUser } from "../api/loginApi";

// Хук для авторизации
export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation<LoginResponse, Error, LoginFormData>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(login(data.access_token)); // Сохраняем токен в Redux
      setStorageItem("accessToken", data.access_token); // Сохраняем токен в AsyncStorage
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
