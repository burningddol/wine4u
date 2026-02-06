"use client";

import { getUserData } from "@/libs/api/auth/getAPIAuth";
import { LoginedUser } from "@/types/auto/types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

interface UserContextValue {
  user: LoginedUser | null | "isPending";
  setUser: (user: LoginedUser | null | "isPending") => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<LoginedUser | null | "isPending">(
    "isPending",
  );

  const refreshUser = useCallback(async () => {
    setUser("isPending");
    try {
      const userData = await getUserData();
      setUser(userData);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
