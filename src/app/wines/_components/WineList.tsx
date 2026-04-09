"use client";

import { useWineList } from "../_libs/hooks/useWineList";
import WineCard from "./WineCard";
import WineSearchBar from "./WineSearchBar";
import WineFilter from "./filter/WineFilter";
import WineRegisterForm from "./register/WineRegisterForm";
import { useModal } from "@/components/ModalProvider";
import { useDeviceTypeStore } from "@/libs/zustand";
import { cn } from "@/libs/utils";
import Image from "next/image";
import { useUser } from "@/components/UserProvider";
import { useToast } from "@/components/ToastProvider";
import dynamic from "next/dynamic";

const ChatBot = dynamic(() => import("./chatBot/ChatBot"), { ssr: false });

export default function WineList() {
  const {
    list,
    search,
    setSearch,
    filter,
    setFilter,
    hasMore,
    observerRef,
    refetch,
  } = useWineList();
  const { deviceType } = useDeviceTypeStore();
  const isDesktop = deviceType === "desktop";

  const { user } = useUser();
  const { showModal } = useModal();
  const { showToast } = useToast();

  const openRegisterModal = () => {
    if (!user) return showToast("로그인이 필요합니다", "error");
    showModal(<WineRegisterForm onSuccess={refetch} />, "와인 등록");
  };

  const openFilterModal = () => {
    showModal(
      <WineFilter
        currentFilter={filter}
        setCurrentFilter={setFilter}
        isDesktop={isDesktop}
      />,
      "필터",
    );
  };

  return (
    <div
      className={cn(
        "m-auto mt-8 mb-10 w-full md:mt-32 xl:mt-42",
        isDesktop ? "flex max-w-[1145px] items-start gap-12" : "",
      )}
    >
      {isDesktop && (
        <div className="sticky top-24 mb-50 self-start">
          <WineFilter
            currentFilter={filter}
            setCurrentFilter={setFilter}
            isDesktop={isDesktop}
          />
          <button
            onClick={openRegisterModal}
            className="hover:bg-primary/90 mt-5 w-full cursor-pointer rounded-sm bg-black py-3.5 text-lg font-bold text-white"
          >
            와인 등록하기
          </button>
        </div>
      )}

      <div className="relative mx-auto h-full w-full md:max-w-[680px] xl:max-w-[801px]">
        <WineSearchBar
          value={search}
          onChange={setSearch}
          openFilter={openFilterModal}
          openRegisterModal={openRegisterModal}
        />

        <section className="mt-14 h-full w-full">
          {list.length === 0 ? (
            <div className="relative m-auto h-[200px] md:h-[250px] xl:mt-30">
              <Image src="/wines/noReview.svg" fill alt="노리뷰사진" />
            </div>
          ) : (
            <div className="grid grid-cols-1 items-start justify-items-center gap-5 md:grid-cols-2 xl:gap-16">
              {list.map((wine, index) => (
                <WineCard key={wine.id} wine={wine} priority={index < 7} />
              ))}
            </div>
          )}

          {hasMore && (
            <div ref={observerRef} className="absolute bottom-100 py-30" />
          )}
        </section>
      </div>

      <ChatBot user={user} />
    </div>
  );
}
