"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMyWines,
  deleteWine,
  type MyWineItem,
} from "@/app/myprofile/_libs/profileApi";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/components/ModalProvider";
import { useToast } from "@/components/ToastProvider";
import { useUser } from "@/components/UserProvider";
import { useDeviceTypeStore } from "@/libs/zustand";
import WineRegisterForm from "@/app/wines/_components/register/WineRegisterForm";
import useOutsideClick from "@/app/(auth)/_libs/useOutsideClick";
import { cn } from "@/libs/utils";
import RegisterEditForm from "./RegisterEditForm";
import { useProfileTab } from "../_contexts/ProfileTabContext";

export default function RegisterTab() {
  const { showModal } = useModal();
  const { showToast } = useToast();
  const { user } = useUser();
  const { deviceType } = useDeviceTypeStore();
  const [wines, setWines] = useState<MyWineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setWineCount } = useProfileTab();

  const loadWines = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMyWines();
      const list = data.list ?? [];
      setWines(list);
      setWineCount(data.totalCount ?? list.length ?? 0);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "등록한 와인 목록을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [setWineCount]);

  const openRegisterModal = () => {
    if (!user) return showToast("로그인이 필요합니다", "error");
    const width = deviceType === "mobile" ? 375 : 460;
    showModal(
      <WineRegisterForm onSuccess={loadWines} />,
      "와인 등록",
      width,
      700,
    );
  };

  useEffect(() => {
    loadWines();
  }, [loadWines]);

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-error">{error}</p>
        <Button type="button" className="mt-4" onClick={loadWines}>
          다시 시도
        </Button>
      </div>
    );
  }

  if (wines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <img
            src="/icons/exclamation_mark.svg"
            className="h-20 w-20 md:h-34 md:w-34"
          />
          <p className="text-2lg font-bold md:text-2xl">
            등록된 와인이 없습니다.
          </p>
        </div>
        <Button type="button" className="mt-4" onClick={openRegisterModal}>
          와인 등록하기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-20 py-10 sm:flex-row-reverse md:px-8">
      {wines.map((wine) => (
        <WineCard
          key={wine.id}
          wine={wine}
          showToast={showToast}
          onDelete={loadWines}
          onEdit={() => {
            const width = deviceType === "mobile" ? 375 : 460;
            showModal(
              <RegisterEditForm wine={wine} onSuccess={loadWines} />,
              "와인 수정",
              width,
              700,
            );
          }}
        />
      ))}
    </div>
  );
}

function WineCard({
  wine,
  showToast,
  onDelete,
  onEdit,
}: {
  wine: MyWineItem;
  showToast: (message: string, type: "success" | "error") => void;
  onDelete: () => Promise<void>;
  onEdit: () => void;
}) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);
  const dropdownRef = useOutsideClick(closeDropdown, isDropdownOpen);

  const handleEdit = useCallback(() => {
    closeDropdown();
    onEdit();
  }, [closeDropdown, showToast]);

  const handleDelete = useCallback(async () => {
    const ok = window.confirm("등록한 와인을 삭제하시겠습니까?");
    if (!ok) return;

    try {
      await deleteWine(wine.id);
      await onDelete();
      showToast("삭제되었습니다", "success");
    } catch (error: any) {
      showToast("삭제에 실패했습니다", "error");
    }
  }, [showToast, onDelete]);

  const goToWineDetail = () => {
    router.push(`/wines/${wine.id}`);
  };

  return (
    <article className="group flex w-full flex-col gap-6 overflow-hidden md:w-[calc(50%-38px)]">
      <button type="button" className="cursor-pointer" onClick={goToWineDetail}>
        <div className="flex-center relative flex aspect-[1/1] overflow-hidden bg-gray-50 p-8">
          <div className="relative block h-full w-full">
            {wine.image ? (
              <Image
                src={wine.image}
                alt={wine.name}
                fill
                className="object-contain"
                unoptimized={wine.image.startsWith("http")}
              />
            ) : (
              <span className="text-5xl">🍷</span>
            )}
          </div>
        </div>
      </button>

      <div className="flex flex-col gap-6 pb-5">
        <div className="relative flex flex-col gap-[6px]">
          <h3 className="w-2/3 text-2xl font-bold">{wine.name}</h3>
          <p className="text-md mb-2 font-normal text-gray-300">
            {wine.region}
          </p>

          <div
            className="absolute top-0 right-0"
            ref={dropdownRef as unknown as React.RefObject<HTMLDivElement>}
          >
            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen((prev) => !prev);
              }}
              aria-label="메뉴 열기"
            >
              <span className="flex flex-col gap-0.5">
                <span className="h-1 w-1 rounded-full bg-current" />
                <span className="h-1 w-1 rounded-full bg-current" />
                <span className="h-1 w-1 rounded-full bg-current" />
              </span>
            </button>

            {isDropdownOpen && (
              <ul
                className={cn(
                  "absolute top-9 right-0 z-10 flex min-w-[120px] flex-col rounded-sm border border-gray-300 bg-white py-1 shadow-sm",
                  "text-base font-normal text-gray-700",
                )}
              >
                <li>
                  <button
                    type="button"
                    className="w-full cursor-pointer px-4 py-2 text-center hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit();
                    }}
                  >
                    수정하기
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-full cursor-pointer px-4 py-2 text-center hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                  >
                    삭제하기
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <p className="text-2xl font-bold">
          {Number(wine.price).toLocaleString()}원
        </p>
      </div>
    </article>
  );
}
