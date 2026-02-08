"use client";

import { useState } from "react";
import { WineListResponse } from "@/types/wines/types";
import { useWineList } from "../_libs/hooks/useWineList";
import WineCard from "./WineCard";
import WineSearchBar from "./WineSearchBar";
import WineFilter from "./WineFilter";
import WineRegisterForm from "./WineRegisterForm";
import { useModal } from "@/components/ModalProvider";
import { useDeviceTypeStore } from "@/libs/zustand";
import { cn } from "@/libs/utils";

interface Props {
  wines: WineListResponse;
}

export default function WineList({ wines }: Props) {
  const { list, search, setSearch, filter, setFilter, hasMore, observerRef, refetch } =
    useWineList(wines);
  const { deviceType } = useDeviceTypeStore();
  const isDesktop = deviceType === "desktop";

  const { showModal } = useModal();

  const openRegisterModal = () => {
    const width = deviceType === "mobile" ? 375 : 460;
    showModal(<WineRegisterForm onSuccess={refetch} />, "와인 등록", width, 700);
  };

  const openFilterModal = () => {
    showModal(
      <WineFilter
        currentFilter={filter}
        setCurrentFilter={setFilter}
        isDesktop={isDesktop}
      />,
      "필터",
      375,
      641,
    );
  };

  return (
    <div
      className={cn(
        "m-auto mt-8 w-full md:mt-32 xl:mt-42",
        isDesktop ? "flex max-w-[1145px] gap-12" : "",
      )}
    >
      {isDesktop && (
        <div>
          <WineFilter
            currentFilter={filter}
            setCurrentFilter={setFilter}
            isDesktop={isDesktop}
          />
          <button
            onClick={openRegisterModal}
            className="mt-5 w-full cursor-pointer rounded-sm bg-black py-3.5 text-sm font-bold text-white"
          >
            와인 등록하기
          </button>
        </div>
      )}

      <div>
        <WineSearchBar
          value={search}
          onChange={setSearch}
          openFilter={openFilterModal}
          openRegisterModal={openRegisterModal}
        />

        <section className="relative container m-auto w-full py-5 md:max-w-[680px] xl:max-w-[801px]">
          <div className="grid grid-cols-1 items-start justify-items-center gap-5 md:grid-cols-2 xl:gap-16">
            {list.map((wine) => (
              <WineCard key={wine.id} wine={wine} />
            ))}
          </div>

          {hasMore && (
            <div ref={observerRef} className="absolute bottom-100 py-30" />
          )}
        </section>
      </div>
    </div>
  );
}
