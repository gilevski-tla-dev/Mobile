import { logout } from "../model/slice";
import { RootState } from "@/app/redux/store";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { removeStorageItem } from "@/shared/lib/storage";
import { logoutUser } from "../api/logoutApi";

export const useLogout = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return useMutation<void, Error>({
    mutationFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is missing or invalid");
      }
      return logoutUser(accessToken);
    },
    onSuccess: () => {
      dispatch(logout());
      removeStorageItem("accessToken");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Очищаем состояние, даже если запрос завершился ошибкой
      dispatch(logout());
      removeStorageItem("accessToken");
    },
  });
};
