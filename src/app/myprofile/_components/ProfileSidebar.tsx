import Image from "next/image";

export default function ProfileSidebar() {
  return (
    <aside className="sticky top-[70px] w-[280px] self-start">
      <div className="flex flex-col gap-12 px-5 py-7">
        <div className="flex flex-col items-center gap-7">
          <Image
            src="/images/profile.png"
            className="rounded-full bg-gray-300"
            width={160}
            height={160}
            alt="profile"
          />
          <span className="text-2xl font-bold">닉네임</span>
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="nickname" className="text-sm font-medium">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="닉네임을 입력해주세요."
          />
          <button className="bg-primary hover:bg-opacity-90 w-full rounded-md p-2 text-white transition">
            변경하기
          </button>
        </div>
      </div>
    </aside>
  );
}
