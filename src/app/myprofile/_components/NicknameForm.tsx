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
}

export default function NicknameForm({
  nickname,
  onNicknameChange,
  onSubmit,
}: NicknameFormProps) {
  const displayNickname = nickname !== "" ? nickname : nickname;
  const hasChanged = nickname !== "" && nickname !== nickname;

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNicknameChange(e.target.value);
  };

  const handleSaveNickname = () => {
    if (!hasChanged) return;
    onSubmit();
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <Input
          name="nickname"
          label="닉네임"
          value={displayNickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력해주세요."
        />
      </div>
      <div className="flex flex-shrink-0 gap-2">
        <Button
          type="button"
          onClick={handleSaveNickname}
          disabled={!hasChanged}
        >
          변경하기
        </Button>
      </div>
    </>
  );
}
