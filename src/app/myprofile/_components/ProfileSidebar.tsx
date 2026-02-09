"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { User } from "@/types/myprofile/types";

interface ProfileSidebarProps {
  user: User;
  nickname: string;
  isUpdating?: boolean;
  isImageUpdating?: boolean;
  onNicknameChange: (value: string) => void;
  onSubmit: () => void;
  onImageClick?: () => void;
}

export default function ProfileSidebar({
  user,
  nickname,
  isUpdating = false,
  isImageUpdating = false,
  onNicknameChange,
  onSubmit,
  onImageClick,
}: ProfileSidebarProps) {
  const userImage = user.image || "/icons/user_icon.svg";

  return (
    <aside className="mt-17.5 w-full shrink-0 self-start px-6 md:sticky md:top-[70px] md:w-[290px]">
      <div className="flex flex-col gap-5 py-7 md:gap-12">
        <div className="flex flex-col items-center gap-4 md:gap-7">
          <div
            className={`relative overflow-hidden rounded-full md:h-[160px] md:w-[160px] ${
              onImageClick && !isImageUpdating
                ? "cursor-pointer outline-none ring-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                : ""
            }`}
            role={onImageClick ? "button" : undefined}
            tabIndex={onImageClick ? 0 : undefined}
            onClick={
              onImageClick && !isImageUpdating ? onImageClick : undefined
            }
            onKeyDown={
              onImageClick && !isImageUpdating
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onImageClick();
                    }
                  }
                : undefined
            }
          >
            <Image
              src={userImage}
              alt="profile"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
            {onImageClick && !isImageUpdating && (
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-sm font-medium text-white transition-colors hover:bg-black/40">
                사진 변경
              </span>
            )}
            {isImageUpdating && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-sm text-white">
                변경 중...
              </div>
            )}
          </div>
          <span className="text-2xl font-bold">
            {user.nickname || "닉네임"}
          </span>
        </div>

        <div className="flex flex-row items-end justify-center gap-4 md:flex-col md:items-center md:justify-start">
          <div className="flex flex-col items-center gap-2">
            <Input
              name="nickname"
              label="닉네임"
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onChange={(e) => onNicknameChange(e.target.value)}
            />
          </div>
          <Button
            type="button"
            className="flex-shrink-0"
            onClick={onSubmit}
            disabled={isUpdating}
          >
            {isUpdating ? "변경 중..." : "변경하기"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
