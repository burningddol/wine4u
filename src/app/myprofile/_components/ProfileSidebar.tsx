// 마이프로필 - 사이드바 컴포넌트

"use client";

import Image from "next/image";

import { User } from "@/types/myprofile/types";
import NicknameForm from "./NicknameForm";

interface ProfileSidebarProps {
  user: User;
  nickname: string;
  onNicknameChange: (value: string) => void;
  onSubmit: () => void;
  onImageClick?: () => void;
  isImageUpdating?: boolean;
}

export default function ProfileSidebar({
  user,
  nickname,
  onNicknameChange,
  onSubmit,
  onImageClick,
  isImageUpdating = false,
}: ProfileSidebarProps) {
  const userImage = user.image || "/user_icon.svg";

  const canClickImage = Boolean(onImageClick);

  return (
    <aside className="w-full shrink-0 self-start px-6 md:sticky md:top-[70px] md:w-[290px]">
      <div className="flex flex-col gap-5 py-7 md:gap-12">
        <div className="flex flex-col items-center gap-4 md:gap-7">
          <div
            role={canClickImage ? "button" : undefined}
            tabIndex={canClickImage ? 0 : undefined}
            className={`relative overflow-hidden rounded-full md:h-[160px] md:w-[160px] ${
              canClickImage
                ? "focus-visible:ring-primary cursor-pointer ring-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                : ""
            }`}
            onClick={onImageClick}
          >
            <Image
              src={userImage}
              alt="profile"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
            {userImage && canClickImage && !isImageUpdating && (
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-sm font-medium text-white transition-colors hover:bg-black/40">
                사진 변경
              </span>
            )}
            {userImage && isImageUpdating && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-sm text-white">
                변경 중...
              </div>
            )}
          </div>
          <span className="text-2xl font-bold">{user.nickname}</span>
        </div>

        <div className="flex flex-row items-end justify-center gap-4 md:flex-col md:items-center md:justify-start">
          <NicknameForm
            user={user}
            nickname={nickname}
            onNicknameChange={onNicknameChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </aside>
  );
}
