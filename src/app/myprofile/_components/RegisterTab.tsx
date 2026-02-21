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
import RegisterEditForm from "./RegisterEditForm";
import DropdownMenu from "./DropdownMenu";
import { useProfileTab } from "../_contexts/ProfileTabContext";
import RegisterTabSkeleton from "./RegisterTabSkeleton";
import EmptyState from "./EmptyState";

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

  if (isLoading) return <RegisterTabSkeleton />;

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
      <EmptyState
        message="등록된 와인이 없습니다."
        actionLabel="와인 등록하기"
        onAction={openRegisterModal}
      />
    );
  }

  return (
    <div className="flex flex-col-reverse gap-20 py-10 md:flex-row md:flex-wrap md:gap-x-[76px] md:gap-y-20 md:px-8">
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
  }, [wine.id, showToast, onDelete]);

  const goToWineDetail = () => {
    router.push(`/wines/${wine.id}`);
  };

  return (
    <article className="flex w-full flex-col gap-6 overflow-hidden md:w-[calc(50%-38px)]">
      <button type="button" className="cursor-pointer" onClick={goToWineDetail}>
        <div className="group flex-center relative flex aspect-[1/1] overflow-hidden bg-gray-50 p-8">
          <div className="relative block h-full w-full transition-transform duration-300 group-hover:scale-110">
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
          <div className="absolute inset-0 bg-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
        </div>
      </button>

      <div className="flex cursor-pointer flex-col gap-6 pb-5" onClick={goToWineDetail}>
        <div className="relative flex flex-col gap-[6px]">
          <h3 className="w-2/3 text-2xl font-bold">{wine.name}</h3>
          <p className="text-md mb-2 font-normal text-gray-300">
            {wine.region}
          </p>

          <DropdownMenu
            className="absolute top-0 right-0"
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        </div>
        <p className="text-2xl font-bold">
          {Number(wine.price).toLocaleString()}원
        </p>
      </div>
    </article>
  );
}
