"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type ProfileTabKey = "reviews" | "register";

type ProfileTabContextValue = {
  activeTab: ProfileTabKey;
  setActiveTab: (tab: ProfileTabKey) => void;

  reviewCount: number;
  wineCount: number;
  setReviewCount: (count: number) => void;
  setWineCount: (count: number) => void;
};

const ProfileTabContext = createContext<ProfileTabContextValue | null>(null);

export function ProfileTabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<ProfileTabKey>("reviews");
  const [reviewCount, setReviewCount] = useState(0);
  const [wineCount, setWineCount] = useState(0);

  return (
    <ProfileTabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        reviewCount,
        wineCount,
        setReviewCount,
        setWineCount,
      }}
    >
      {children}
    </ProfileTabContext.Provider>
  );
}

export function useProfileTab() {
  const ctx = useContext(ProfileTabContext);
  if (!ctx) throw new Error("에러: 탭 컨텍스트를 찾을 수 없습니다.");
  return ctx;
}
