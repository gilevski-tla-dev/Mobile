import { RootState } from "@/app/redux/store";

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
