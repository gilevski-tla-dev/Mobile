import { RootState } from "@/app/redux/store";

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
