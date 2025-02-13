import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  setStorageItem,
  removeStorageItem,
  getStorageItem,
} from "@/shared/lib/storage";
import { AppDispatch } from "@/app/redux/store";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.accessToken = action.payload;
      setStorageItem("accessToken", action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      removeStorageItem("accessToken");
    },
    restoreToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const { login, logout, restoreToken } = authSlice.actions;
export const authReducer = authSlice.reducer;

// Thunk для инициализации токена

export const initializeAuth = () => async (dispatch: AppDispatch) => {
  const token = await getStorageItem("accessToken");
  dispatch(restoreToken(token));
};
