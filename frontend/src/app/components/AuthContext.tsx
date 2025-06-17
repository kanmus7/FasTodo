"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  isPending: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const hasToken = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("token="));
    setIsAuthenticated(hasToken);
  }, []);

  const login = useCallback(
    (token: string) => {
      document.cookie = `token=${token}; path=/; max-age=3600`;
      setIsAuthenticated(true);
      startTransition(() => {
        router.push("/tasks");
      });
    },
    [router]
  );

  const logout = useCallback(() => {
    document.cookie = "token=; path=/; max-age=0";
    setIsAuthenticated(false);
    startTransition(() => {
      router.push("/");
    });
  }, [router]);

  const contextValues = useMemo(() => {
    return {
      login,
      logout,
      isAuthenticated,
      isPending,
    };
  }, [isAuthenticated, login, logout, isPending]);

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
