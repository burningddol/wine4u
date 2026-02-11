// 마이프로필 - 닉네임 폼 컴포넌트

"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User } from "@/types/auth/types";

interface NicknameFormProps {
  user: User;
  nickname: string;
  onNicknameChange: (value: string) => void;
  onSubmit: () => void;
  isSubmission?: boolean;
  errorMessage?: string | null;
}

export default function NicknameForm({
  user,
  nickname,
  onNicknameChange,
  onSubmit,
  isSubmission = false,
  errorMessage = null,
}: NicknameFormProps) {
  const trimmedNickname = nickname.trim();
  const hasChanged =
    trimmedNickname.length > 0 && trimmedNickname !== user.nickname;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!hasChanged || isSubmission) return;
          onSubmit();
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <Input
            name="nickname"
            label="닉네임"
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            placeholder="닉네임을 입력해주세요."
          />
        </div>

        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

        <div className="flex flex-shrink-0 gap-2">
          <Button type="submit" disabled={!hasChanged || isSubmission}>
            {isSubmission ? "변경 중..." : "변경하기"}
          </Button>
        </div>
      </form>
    </>
  );
}
