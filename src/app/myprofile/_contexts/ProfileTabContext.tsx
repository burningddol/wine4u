"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type ProfileTabKey = "reviews" | "register";

type ProfileTabContextValue = {
  activeTab: ProfileTabKey;
  setActiveTab: (tab: ProfileTabKey) => void;
};

const ProfileTabContext = createContext<ProfileTabContextValue | null>(null);

export function ProfileTabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<ProfileTabKey>("reviews");
  return (
    <ProfileTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ProfileTabContext.Provider>
  );
}

export function useProfileTab() {
  const ctx = useContext(ProfileTabContext);
  if (!ctx) throw new Error("useProfileTab must be used within ProfileTabProvider");
  return ctx;
}
