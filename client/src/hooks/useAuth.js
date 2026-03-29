import { useAuthStore } from "../context/store";

export const useAuth = () => {
  const { user, token, authLoading, setUser, setToken, logout } =
    useAuthStore();
  return { user, token, authLoading, setUser, setToken, logout };
};
