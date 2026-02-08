"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getMyWines, type MyWineItem } from "@/app/myprofile/_libs/profileApi";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/components/ModalProvider";
import { useToast } from "@/components/ToastProvider";
import { useUser } from "@/components/UserProvider";
import { useDeviceTypeStore } from "@/libs/zustand";
import WineRegisterForm from "@/app/wines/_components/register/WineRegisterForm";

export default function RegisterTab() {
  const { showModal } = useModal();
  const { showToast } = useToast();
  const { user } = useUser();
  const { deviceType } = useDeviceTypeStore();
  const [wines, setWines] = useState<MyWineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWines = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMyWines();
      setWines(data.list ?? []);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "등록한 와인 목록을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openRegisterModal = useCallback(() => {
    if (!user || user === "isPending") return showToast("로그인이 필요합니다", "error");
    const width = deviceType === "mobile" ? 375 : 460;
    showModal(
      <WineRegisterForm onSuccess={loadWines} />,
      "와인 등록",
      width,
      700,
    );
  }, [user, deviceType, showModal, showToast, loadWines]);

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
      <div className="py-12 text-center">
        <p className="text-gray-600">등록된 와인이 없습니다.</p>
        <Button
          type="button"
          className="mt-4"
          onClick={openRegisterModal}
        >
          와인 등록하기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-wrap gap-x-19 gap-y-10">
      {wines.map((wine) => (
        <WineCard key={wine.id} wine={wine} />
      ))}
    </div>
  );
}

function WineCard({ wine }: { wine: MyWineItem }) {
  return (
    <article className="group flex w-[calc(50%-38px)] cursor-pointer flex-col gap-6 overflow-hidden">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gray-100">
        {wine.image ? (
          <Image
            src={wine.image}
            alt={wine.name}
            fill
            className="object-cover"
            unoptimized={wine.image.startsWith("http")}
          />
        ) : (
          <span className="text-5xl">🍷</span>
        )}
      </div>

      <div className="flex flex-col gap-6 pb-5">
        <div className="relative flex flex-col gap-[6px]">
          <h3 className="w-2/3 text-2xl font-bold">{wine.name}</h3>
          <p className="text-md mb-2 font-normal text-gray-300">
            {wine.region}
          </p>
          <div className="absolute top-0 right-0">삭제</div>
        </div>
        <p className="text-2xl font-bold">
          ₩{Number(wine.price).toLocaleString()}
        </p>
      </div>
    </article>
  );
}
