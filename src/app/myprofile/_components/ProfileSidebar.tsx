import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUser } from "@/components/UserProvider";
import { updateUserNickname } from "../_libs/profileApi";
import { useToast } from "@/components/ToastProvider";

export default function ProfileSidebar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const { showToast } = useToast();
  const initialNickname =
    user && user !== "isPending" ? (user.nickname ?? "") : "";
  const [nickname, setNickname] = useState(initialNickname);

  useEffect(() => {
    if (user && user !== "isPending" && user.nickname != null) {
      setNickname(user.nickname);
    }
  }, [user]);

  if (user === "isPending") {
    return <div>로딩중...</div>;
  }

  const handleUpdateNickname = async () => {
    try {
      await updateUserNickname(nickname);
      showToast("닉네임 변경에 성공했습니다.", "success");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "닉네임 변경에 실패했습니다.";
      console.error("닉네임 변경 실패:", error);
      showToast(message, "error");
    }
  };

  return (
    <aside className="sticky top-[70px] w-[290px] self-start px-6">
      <div className="flex flex-col gap-12 py-7">
        <div className="flex flex-col items-center gap-7">
          {user?.image && (
            <Image
              src={user?.image ?? "/icons/user_icon.svg"}
              alt="profile"
              width={160}
              height={160}
              className="overflow-hidden rounded-full"
            />
          )}
          <span className="text-2xl font-bold">
            {user?.nickname ?? "닉네임"}
          </span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Input
              ref={inputRef}
              name="nickname"
              label="닉네임"
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <Button type="button" onClick={handleUpdateNickname}>
            변경하기
          </Button>
        </div>
      </div>
    </aside>
  );
}
