import { useMemo } from "react";
import { useAppSelector } from "./reduxHooks";

export const useAuth = () => {
  const { user, token, refreshToken, loading } = useAppSelector(
    (state) => state.auth,
  );
  return useMemo(
    () => ({
      user,
      token,
      refreshToken,
      loading,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === "admin",
    }),
    [user, token, refreshToken, loading],
  );
};
