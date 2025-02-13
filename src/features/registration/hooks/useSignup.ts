import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import {
  SignupFormData,
  SignupResponse,
  signupUser,
} from "../api/registrationApi";

// Хук для регистрации
export const useSignup = () => {
  const navigation = useNavigation(); // Используем навигацию

  return useMutation<SignupResponse, Error, SignupFormData>({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log("Registration successful:", data.message);

      // Переводим пользователя на экран Authorization после успешной регистрации
      navigation.navigate("Authorization" as never); // Используем as never для обхода типизации
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};
