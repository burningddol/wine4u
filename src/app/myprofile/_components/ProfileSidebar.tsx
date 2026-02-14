// 마이프로필 - 사이드바 컴포넌트

"use client";

import Image from "next/image";

import { useRef } from "react";
import { LoginedUser } from "@/types/auth/types";
import NicknameForm from "./NicknameForm";
import { useToast } from "@/components/ToastProvider";

interface ProfileSidebarProps {
  user: LoginedUser;
  nickname: string;
  onNicknameChange: (value: string) => void;
  onSubmit: () => void;
  isSubmission?: boolean;
  errorMessage?: string | null;
  onImageChange: (file: File) => void;
  isImageUpdating?: boolean;
}

export default function ProfileSidebar({
  user,
  nickname,
  onNicknameChange,
  onSubmit,
  isSubmission = false,
  errorMessage = null,
  onImageChange,
  isImageUpdating = false,
}: ProfileSidebarProps) {
  const userImage = user.image || "/user_icon.svg";
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const MB = 1024 * 1024;
  const Max_SIZE = 5 * MB;
  const FILE_NAME_REGEX = /^[a-zA-Z0-9_\- ]+\.[a-zA-Z0-9]+$/;

  const handleClickImage = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > Max_SIZE) {
      showToast("파일 크기는 5MB 이하만 가능합니다.", "error");
      return;
    }

    if (!FILE_NAME_REGEX.test(file.name)) {
      showToast("파일 이름은 영문 및 숫자만 허용됩니다.", "error");
      return;
    }
    onImageChange(file);
  };

  return (
    <aside className="w-full shrink-0 self-start px-10 md:sticky md:top-[70px] md:w-[290px] md:px-6">
      <div className="flex flex-col gap-5 py-7 md:gap-12">
        <div className="flex flex-col items-center gap-3 md:gap-7">
          <div
            className="group focus-visible:ring-primary relative flex aspect-[1/1] h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full ring-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:h-[160px] md:w-[160px]"
            role="button"
            tabIndex={0}
            onClick={handleClickImage}
          >
            <span className="relative block h-full w-full">
              <Image
                src={userImage}
                alt="profile"
                fill
                className="object-contain transition-all duration-200 group-hover:blur-sm"
                unoptimized={userImage.startsWith("http")}
              />
            </span>

            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 opacity-0 transition-all duration-200 group-hover:opacity-100">
              <img src="/icons/camera_fill.svg" alt="camera" />
            </span>

            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg, image/png, image/jpg, image/webp, image/gif"
              className="hidden"
              onChange={handleImageChange}
            />

            {isImageUpdating && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-sm text-white">
                변경 중...
              </div>
            )}
          </div>
          <span className="text-lg font-bold md:text-2xl">{user.nickname}</span>
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
