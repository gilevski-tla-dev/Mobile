import React, { useEffect } from "react";
import { useAppDispatch } from "@/app/redux/store";
import { initializeAuth } from "@/features/auth/model/slice";

export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return <>{children}</>;
};
