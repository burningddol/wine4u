'use client';

import { useEffect } from 'react';
import { useDeviceTypeStore } from '@/libs/zustand';

export type { DeviceType } from '@/libs/zustand';

const BREAKPOINTS = {
  tablet: 768,
  desktop: 1280,
} as const;

export function useDeviceType() {
  const { setDeviceType } = useDeviceTypeStore();

  useEffect(() => {
    const tabletQuery = window.matchMedia(
      `(min-width: ${BREAKPOINTS.tablet}px)`,
    );
    const desktopQuery = window.matchMedia(
      `(min-width: ${BREAKPOINTS.desktop}px)`,
    );

    const getDeviceType = () => {
      if (desktopQuery.matches) return 'desktop' as const;
      if (tabletQuery.matches) return 'tablet' as const;
      return 'mobile' as const;
    };

    setDeviceType(getDeviceType());

    const handleChange = () => {
      setDeviceType(getDeviceType());
    };

    tabletQuery.addEventListener('change', handleChange);
    desktopQuery.addEventListener('change', handleChange);

    return () => {
      tabletQuery.removeEventListener('change', handleChange);
      desktopQuery.removeEventListener('change', handleChange);
    };
  }, [setDeviceType]);
}
