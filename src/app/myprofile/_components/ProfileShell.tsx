// 마이프로필 - 탭 상태

"use client";

import { useState, useEffect } from "react";
import type { User } from "@/types/myprofile/types";
import { getUserData } from "@/libs/api/auth/getAPIAuth";
import { updateUserNickname } from "../_libs/profileApi";

import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";
import ProfileTabPanel from "./ProfileTabPanel";
import { useToast } from "@/components/ToastProvider";

export default function ProfileShell() {
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);

  const [isSubmission, setIsSubmission] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { showToast } = useToast();

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

  const handleSubmit = async () => {
    if (!user) return;

    const nextNickname = nickname.trim();

    try {
      setIsSubmission(true);
      setErrorMessage(null);
      const updatedUser = await updateUserNickname(nextNickname);
      setUser(updatedUser);
      setNickname(updatedUser.nickname);
      showToast("닉네임 변경에 성공했습니다.", "success");
    } catch (any: any) {
      showToast(any.message ?? "닉네임 변경에 실패했습니다.", "error");
    } finally {
      setIsSubmission(false);
    }
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
          user={user}
          nickname={nickname}
          onNicknameChange={setNickname}
          onSubmit={handleSubmit}
          isSubmission={isSubmission}
          errorMessage={errorMessage}
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
