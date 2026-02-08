"use client";

import { useState } from "react";
import ProfileSidebar from "./_components/ProfileSidebar";
import ReviewsTab from "./_components/ReviewsTab";
import RegisterTab from "./_components/RegisterTab";

type TabKey = "reviews" | "register";

export default function MyProfileLayout(_props: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("reviews");
  const reviews = [];
  const registeredWines = [];

  const navTabs = [
    { key: "reviews" as const, label: `내가 쓴 후기 ${reviews.length}` },
    {
      key: "register" as const,
      label: `내가 등록한 와인 ${registeredWines.length}`,
    },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1140px]">
      <ProfileSidebar />

      <main className="flex-1 border-l border-gray-200">
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

        <div className="px-8 pt-32 pb-10">
          {activeTab === "reviews" && <ReviewsTab />}
          {activeTab === "register" && <RegisterTab />}
        </div>
      </main>
    </div>
  );
}
