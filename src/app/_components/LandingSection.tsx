"use client";

import { ReactNode, useCallback, useRef } from "react";
import LandingInfo from "./LandingInfo";
import { RenderModel } from "./RenderModel";
import { useScrollProgress } from "../_libs/useScrollProgress";
import { useDeviceType } from "../wines/_libs/hooks/useDeviceType";
import { useDeviceTypeStore } from "@/libs/zustand";
import { cn } from "@/libs/utils";
import Link from "next/link";

interface LandingSectionProps {
  children: ReactNode;
}

export const SCROLL_HEIGHT_VH = 280;
const LANDING_BG = "#101318";
const MOBILE_SCROLL_HEIGHT_VH = 101;

export default function LandingSection({ children }: LandingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useDeviceType();
  const { deviceType } = useDeviceTypeStore();

  const scrollHeight =
    deviceType === "desktop" ? SCROLL_HEIGHT_VH : MOBILE_SCROLL_HEIGHT_VH;

  const { progress, isComplete } = useScrollProgress(
    containerRef,
    scrollHeight,
  );

  const handleScrollToEnd = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight * (SCROLL_HEIGHT_VH / 100),
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{ height: `${scrollHeight}vh`, background: LANDING_BG }}
        className="relative"
      >
        <div
          className="sticky top-0 h-dvh w-full overflow-hidden"
          style={{ background: LANDING_BG }}
        >
          <div className="absolute inset-0">
            <RenderModel deviceType={deviceType} progress={progress} />
          </div>

          <LandingInfo progress={progress} onScrollToEnd={handleScrollToEnd} />
        </div>
      </div>

      <div
        className="overflow-x-hidden transition-opacity duration-500"
        style={{
          opacity: isComplete ? 1 : 0,
          pointerEvents: "none",
        }}
      >
        {children}

        <Link
          href="/wines"
          className={cn(
            "hover:bg-primary/90 fixed bottom-28 left-1/2 h-12.5 w-71 -translate-x-1/2 cursor-pointer rounded-sm bg-black text-lg text-white",
            isComplete ? "pointer-events-auto" : "pointer-events-none",
            "flex items-center justify-center no-underline",
          )}
        >
          와인 보러가기
        </Link>
      </div>
    </>
  );
}
