import { authReducer } from "@/features/auth/model/slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку для thunks
    }).concat(logger), // Добавляем redux-logger в middleware
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Хук для типизированного useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
