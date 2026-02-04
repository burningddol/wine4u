'use client';

import { ReactNode, useRef } from 'react';
import LandingInfo from './LandingInfo';
import { RenderModel } from './RenderModel';
import { useScrollProgress } from '../_libs/useScrollProgress';
import { useDeviceType } from '../wines/_libs/hooks/useDeviceType';
import { useDeviceTypeStore } from '@/libs/zustand';
import { cn } from '@/libs/utils';
import Link from 'next/link';

interface LandingSectionProps {
  children: ReactNode;
}

export const SCROLL_HEIGHT_VH = 280;

export default function LandingSection({ children }: LandingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useDeviceType();
  const { deviceType } = useDeviceTypeStore();

  const scrollHeight = deviceType !== 'mobile' ? SCROLL_HEIGHT_VH : 101;

  const { progress, isComplete } = useScrollProgress(
    containerRef,
    scrollHeight,
  );

  return (
    <>
      <div
        ref={containerRef}
        style={{ height: `${scrollHeight}vh` }}
        className="relative"
      >
        <div
          className="sticky top-0 h-screen w-full overflow-hidden pt-[70px]"
          style={{
            background: '#101318',
          }}
        >
          <div className="absolute inset-0">
            <RenderModel deviceType={deviceType} progress={progress} />
          </div>

          <LandingInfo progress={progress} />
        </div>
      </div>

      <div
        className="transition-opacity duration-500"
        style={{
          opacity: isComplete ? 1 : 0,
          pointerEvents: 'none',
        }}
      >
        {children}

        <Link
          href="/wines"
          className={cn(
            'fixed bottom-28 left-1/2 h-12.5 w-71 -translate-x-1/2 cursor-pointer rounded-sm bg-black text-white',
            isComplete ? 'pointer-events-auto' : 'pointer-none',
            'flex items-center justify-center no-underline',
          )}
        >
          와인 보러가기
        </Link>
      </div>
    </>
  );
}
