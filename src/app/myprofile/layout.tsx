"use client";

import { useEffect, useRef, useState } from "react";
import ProfileSidebar from "./_components/ProfileSidebar";
import {
  ProfileTabProvider,
  useProfileTab,
  type ProfileTabKey,
} from "./_contexts/ProfileTabContext";
import { useUser } from "@/components/UserProvider";
import { useToast } from "@/components/ToastProvider";
import {
  getMyReviews,
  getMyWines,
  updateUserNickname,
  updateUserImage,
} from "./_libs/profileApi";
import { getImageURL } from "@/libs/api/wines/getAPIData";
import type { User as MyProfileUser } from "@/types/myprofile/types";

const navTabs: { key: ProfileTabKey; label: string }[] = [
  { key: "reviews", label: "내가 쓴 후기" },
  { key: "register", label: "내가 등록한 와인" },
];

function ProfileTabNav({
  reviewCount,
  wineCount,
}: {
  reviewCount: number | null;
  wineCount: number | null;
}) {
  const { activeTab, setActiveTab } = useProfileTab();
  const getTabLabel = (tab: (typeof navTabs)[number]) => {
    if (tab.key === "reviews" && reviewCount !== null) {
      return `${tab.label} ${reviewCount}`;
    }
    if (tab.key === "register" && wineCount !== null) {
      return `${tab.label} ${wineCount}`;
    }
    return tab.label;
  };
  return (
    <nav
      className="sticky top-[70px] z-10 border-b border-gray-200 bg-white px-10"
      role="tablist"
    >
      <div className="flex gap-1">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={`relative cursor-pointer px-4 pt-9 pb-5 text-xl font-bold transition-colors ${
                isActive ? "text-primary" : "text-gray-600 hover:text-black"
              } ${isActive ? "border-primary -mb-[1px] border-b-2" : ""}`}
            >
              {getTabLabel(tab)}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user: authUser, refreshUser } = useUser();
  const { showToast } = useToast();

  const profileUser: MyProfileUser | null =
    authUser && authUser !== "isPending"
      ? {
          id: authUser.id,
          nickname: authUser.nickname,
          image: authUser.image ?? "",
        }
      : null;

  const [nickname, setNickname] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isImageUpdating, setIsImageUpdating] = useState(false);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [wineCount, setWineCount] = useState<number | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profileUser) {
      setNickname(profileUser.nickname ?? "");
    }
  }, [profileUser?.nickname]);

  useEffect(() => {
    if (!profileUser) return;
    getMyReviews({ limit: 1 })
      .then((data) => {
        setReviewCount(data.totalCount ?? data.list.length);
      })
      .catch(() => {
        setReviewCount(0);
      });
  }, [profileUser]);

  useEffect(() => {
    if (!profileUser) return;
    getMyWines({ limit: 1 })
      .then((data) => {
        setWineCount(data.totalCount ?? data.list.length);
      })
      .catch(() => {
        setWineCount(0);
      });
  }, [profileUser]);

  if (authUser === "isPending") {
    return <div>로딩중...</div>;
  }

  if (!profileUser) {
    return <div>로그인이 필요합니다.</div>;
  }

  const handleUpdateNickname = () => {
    if (!nickname.trim()) {
      showToast("닉네임을 입력해주세요.", "error");
      return;
    }

    if (nickname === profileUser.nickname) {
      showToast("변경할 닉네임이 없습니다.", "error");
      return;
    }

    setIsUpdating(true);
    updateUserNickname(nickname)
      .then(() => {
        refreshUser();
        showToast("닉네임 변경에 성공했습니다.", "success");
      })
      .catch((error) => {
        const rawMessage =
          error instanceof Error
            ? error.message
            : "닉네임 변경에 실패했습니다.";
        showToast(rawMessage, "error");
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setIsImageUpdating(true);
    try {
      const result = await getImageURL(file);
      if (!result?.url) {
        showToast("이미지 업로드에 실패했습니다.", "error");
        return;
      }
      await updateUserImage(result.url);
      refreshUser();
      showToast("프로필 이미지가 변경되었습니다.", "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "이미지 변경에 실패했습니다.";
      showToast(message, "error");
    } finally {
      setIsImageUpdating(false);
    }
  };

  return (
    <ProfileTabProvider>
      <div className="mx-auto flex min-h-screen w-full max-w-[1140px] flex-col md:flex-row">
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          aria-hidden
          onChange={handleImageFile}
        />
        <ProfileSidebar
          user={profileUser}
          nickname={nickname}
          onNicknameChange={setNickname}
          onSubmit={handleUpdateNickname}
          onImageClick={handleImageClick}
          isUpdating={isUpdating}
          isImageUpdating={isImageUpdating}
        />

        <main className="min-w-0 flex-1 border-l border-gray-200">
          <ProfileTabNav reviewCount={reviewCount} wineCount={wineCount} />

          <div className="px-8 pt-32 pb-10">{children}</div>
        </main>
      </div>
    </ProfileTabProvider>
  );
}
