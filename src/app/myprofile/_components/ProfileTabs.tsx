// 마이프로필 - 탭

"use client";

import { useProfileTab } from "../_contexts/ProfileTabContext";

export default function ProfileTabs() {
  const { activeTab, setActiveTab } = useProfileTab();

  return (
    <>
      <div className="sticky top-17.5 z-1 flex gap-8 border-b border-gray-200 bg-white px-10">
        <button
          className={`relative cursor-pointer px-4 pt-9 pb-5 text-xl font-bold transition-colors ${activeTab === "reviews" ? "text-primary" : "text-gray-600 hover:text-black"} ${activeTab === "reviews" ? "" : ""}`}
          onClick={() => setActiveTab("reviews")}
          aria-pressed={activeTab === "reviews"}
        >
          내가 쓴 후기
        </button>
        <button
          className={`relative cursor-pointer px-4 pt-9 pb-5 text-xl font-bold transition-colors ${activeTab === "register" ? "text-primary" : "text-gray-600 hover:text-black"} ${activeTab === "register" ? "" : ""}`}
          onClick={() => setActiveTab("register")}
          aria-pressed={activeTab === "register"}
        >
          내가 등록한 와인
        </button>
      </div>
    </>
  );
}
