"use client";

import { useProfileTab } from "./_contexts/ProfileTabContext";
import ReviewsTab from "./_components/ReviewsTab";
import RegisterTab from "./_components/RegisterTab";

export default function MyProfilePage() {
  const { activeTab } = useProfileTab();

  return (
    <>
      {activeTab === "reviews" && <ReviewsTab />}
      {activeTab === "register" && <RegisterTab />}
    </>
  );
}
