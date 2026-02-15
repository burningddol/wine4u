// 마이프로필 - 탭

"use client";

import { useProfileTab } from "../_contexts/ProfileTabContext";

export default function ProfileTabs() {
  const { activeTab, setActiveTab, reviewCount, wineCount } = useProfileTab();

  return (
    <>
      <div className="sticky top-17.5 z-1 flex gap-6 border-b border-gray-200 bg-white px-[4px] md:gap-8 md:px-10">
        <button
          className={`relative mt-2 mb-3.5 cursor-pointer text-xl font-bold transition-colors md:mt-0 md:mb-0 md:pt-5 md:pb-5 ${activeTab === "reviews" ? "text-primary" : "text-gray-600 hover:text-black"} ${activeTab === "reviews" ? "" : ""}`}
          onClick={() => setActiveTab("reviews")}
          aria-pressed={activeTab === "reviews"}
        >
          내가 쓴 후기 {reviewCount}
        </button>
        <button
          className={`relative mt-2 mb-3.5 cursor-pointer text-xl font-bold transition-colors md:mt-0 md:mb-0 md:pt-5 md:pb-5 ${activeTab === "register" ? "text-primary" : "text-gray-600 hover:text-black"} ${activeTab === "register" ? "" : ""}`}
          onClick={() => setActiveTab("register")}
          aria-pressed={activeTab === "register"}
        >
          내가 등록한 와인 {wineCount}
        </button>
      </div>
    </>
  );
}
