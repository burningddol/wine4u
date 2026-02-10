// 마이프로필 - 탭 상태

"use client";

import { useState, useEffect } from "react";
import type { User } from "@/types/myprofile/types";
import { getUserData } from "@/libs/api/auth/getAPIAuth";

import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";
import ProfileTabPanel from "./ProfileTabPanel";
import { useProfileTab } from "../_contexts/ProfileTabContext";

export default function ProfileShell() {
  const { activeTab } = useProfileTab();

  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserData();
        setUser(data as User);
        setNickname(data?.nickname ?? "");
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = () => {
    // TODO: 닉네임 변경
  };

  if (loading) {
    return <div>로딩중 ...</div>;
  }

  if (!user) {
    return <div>로그인 후 이용 ...</div>;
  }

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-[1140px] flex-col md:mt-17.5 md:flex-row">
        {/* 좌측 (마이프로필 사진+닉네임변경) */}
        <ProfileSidebar
          user={user as User}
          nickname={nickname}
          onNicknameChange={setNickname}
          onSubmit={handleSubmit}
        />

        {/* 우측 (탭 내용) */}
        <section className="sticky top-[70px] z-10 w-full border-l border-gray-200 bg-white">
          <ProfileTabs />
          <ProfileTabPanel />
        </section>
      </div>
    </>
  );
}
