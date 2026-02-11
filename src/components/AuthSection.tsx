"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useUser } from "./UserProvider";
import { logout } from "@/libs/api/auth/getAPIAuth";
import useOutsideClick from "@/app/(auth)/_libs/useOutsideClick";
import { cn } from "@/libs/utils";

export default function AuthSection() {
  const { user, setUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const dropdownRef = useOutsideClick(closeDropdown, isDropdownOpen);

  const handleLogout = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setUser(null);
  };

  if (user === "isPending") {
    return <span className="text-white">로딩중이미지 추가</span>;
  }

  if (user) {
    return (
      <button
        className="relative cursor-pointer border-none bg-transparent"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <Image
          src={user.image ?? "/icons/user_icon.svg"}
          alt="유저 아이콘"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
        />
        {isDropdownOpen && (
          <ul
            className={cn(
              "absolute top-[60px] left-[-49px] flex h-[102px] w-[139px] cursor-pointer flex-col items-center justify-center",
              "rounded-sm border border-gray-300 bg-white p-1 text-base font-normal text-gray-500",
            )}
            ref={dropdownRef}
          >
            <li className="h-full w-full content-center rounded-sm hover:bg-gray-200">
              <Link
                href="/myprofile"
                className="text-gray-700 no-underline"
                prefetch
                onClick={(e) => e.stopPropagation()}
              >
                마이페이지
              </Link>
            </li>

            <li
              className="h-full w-full content-center rounded-sm text-gray-700 hover:bg-gray-200"
              onClick={handleLogout}
            >
              로그아웃
            </li>
          </ul>
        )}
      </button>
    );
  }

  return (
    <Link href="/login" className="text-white">
      로그인
    </Link>
  );
}
