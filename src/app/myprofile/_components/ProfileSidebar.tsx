import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ProfileSidebar() {
  return (
    <aside className="sticky top-[70px] w-[290px] self-start px-6">
      <div className="flex flex-col gap-12 py-7">
        <div className="flex flex-col items-center gap-7">
          <Image
            src="/images/profile.png"
            className="overflow-hidden rounded-full bg-gray-300"
            width={160}
            height={160}
            alt="profile"
          />
          <span className="text-2xl font-bold">닉네임</span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Input
              name="nickname"
              label="닉네임"
              placeholder="닉네임을 입력해주세요."
            />
          </div>
          <Button>변경하기</Button>
        </div>
      </div>
    </aside>
  );
}
