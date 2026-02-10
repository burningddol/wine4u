// 탭 콘텐츠 (내가 쓴 후기, 내가 등록한 와인)

"use client";

import { useProfileTab } from "../_contexts/ProfileTabContext";
import ReviewsTab from "./ReviewsTab";
import RegisterTab from "./RegisterTab";
import { useToast } from "@/components/ToastProvider";

export default function ProfileTabPanel() {
  const { activeTab } = useProfileTab();
  const { showToast } = useToast();
  return (
    <>
      <div className={activeTab === "reviews" ? "block" : "hidden"}>
        <ReviewsTab showToast={showToast} />
      </div>
      <div className={activeTab === "register" ? "block" : "hidden"}>
        <RegisterTab />
      </div>
    </>
  );
}
