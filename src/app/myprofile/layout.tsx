"use client";

import { useState } from "react";
import ProfileSidebar from "./_components/ProfileSidebar";
import { ProfileTabProvider, useProfileTab, type ProfileTabKey } from "./_contexts/ProfileTabContext";

const navTabs: { key: ProfileTabKey; label: string }[] = [
  { key: "reviews", label: "내가 쓴 후기" },
  { key: "register", label: "내가 등록한 와인" },
];

function ProfileTabNav() {
  const { activeTab, setActiveTab } = useProfileTab();
  return (
    <nav
      className="sticky top-[70px] z-10 border-b border-gray-200 bg-white px-10"
      role="tablist"
    >
      <div className="flex gap-1">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={`relative cursor-pointer px-4 pt-9 pb-5 text-xl font-bold transition-colors ${
                isActive ? "text-primary" : "text-gray-600 hover:text-black"
              } ${isActive ? "border-primary -mb-[1px] border-b-2" : ""}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileTabProvider>
      <div className="mx-auto flex min-h-screen w-full max-w-[1140px]">
        <ProfileSidebar />

        <main className="flex-1 border-l border-gray-200">
          <ProfileTabNav />

          <div className="px-8 pt-32 pb-10">{children}</div>
        </main>
      </div>
    </ProfileTabProvider>
  );
}
