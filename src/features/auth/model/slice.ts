import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
}

// Начальное состояние
const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
};

// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.accessToken = action.payload; // Сохраняем токен в Redux
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null; // Удаляем токен при выходе
    },
  },
});

// Экспортируем экшены и редьюсер
export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

// Пример использования
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectIsAuthenticated, login, logout } from '../features/auth/model';

// export default function Home() {
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector(selectIsAuthenticated);

//   const handleLogin = () => {
//     dispatch(login());
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <div>
//       <h1>Home Page</h1>
//       <p>{isAuthenticated ? 'Вы авторизованы' : 'Вы не авторизованы'}</p>
//       <button onClick={handleLogin}>Войти</button>
//       <button onClick={handleLogout}>Выйти</button>
//     </div>
//   );
// }
