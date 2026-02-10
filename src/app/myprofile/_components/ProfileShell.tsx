// 마이프로필 - 탭 상태

"use client";

import { useState, useEffect } from "react";
import type { User } from "@/types/myprofile/types";
import { getUserData } from "@/libs/api/auth/getAPIAuth";
import { updateUserNickname, updateUserImageFile } from "../_libs/profileApi";
import { useUser } from "@/components/UserProvider";

import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";
import ProfileTabPanel from "./ProfileTabPanel";
import { useToast } from "@/components/ToastProvider";

export default function ProfileShell() {
  const { user, setUser } = useUser();
  const [nickname, setNickname] = useState("");

  const [isSubmission, setIsSubmission] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isImageUpdating, setIsImageUpdating] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    if (user && user !== "isPending") setNickname(user.nickname ?? "");
  }, [user]);

  if (user === "isPending") {
    return <div>로딩중 ...</div>;
  }

  if (!user) {
    return <div>로그인 후 이용 ...</div>;
  }

  const handleSubmit = async () => {
    const nextNickname = nickname.trim();

    try {
      setIsSubmission(true);
      setErrorMessage(null);

      const updatedUser = await updateUserNickname(nextNickname);

      setUser(updatedUser);
      showToast("닉네임 변경에 성공했습니다.", "success");
    } catch (any: any) {
      showToast(any.message ?? "닉네임 변경에 실패했습니다.", "error");
    } finally {
      setIsSubmission(false);
    }
  };

  const handleImageChange = async (file: File) => {
    if (!user) return;

    try {
      setIsImageUpdating(true);

      const updatedUser = await updateUserImageFile(file);

      setUser(updatedUser);
      showToast("프로필 사진이 변경되었습니다.", "success");
    } catch (any: any) {
      showToast("프로필 사진 변경이 실패했습니다.", "error");
    } finally {
      setIsImageUpdating(false);
    }
  };

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
          onImageChange={handleImageChange}
          isImageUpdating={isImageUpdating}
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
