// 탭 콘텐츠 (내가 쓴 후기, 내가 등록한 와인)

"use client";

import { useProfileTab } from "../_contexts/ProfileTabContext";
import ReviewsTab from "./ReviewsTab";
import RegisterTab from "./RegisterTab";

export default function ProfileTabPanel() {
  const { activeTab } = useProfileTab();

  return (
    <>
      <div className={activeTab === "reviews" ? "block" : "hidden"}>
        <ReviewsTab />
      </div>
      <div className={activeTab === "register" ? "block" : "hidden"}>
        <RegisterTab />
      </div>
    </>
  );
}
