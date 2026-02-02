'use client';

import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

const BREAKPOINTS = {
  tablet: 768,
  desktop: 1280,
} as const;

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const tabletQuery = window.matchMedia(
      `(min-width: ${BREAKPOINTS.tablet}px)`,
    );
    const desktopQuery = window.matchMedia(
      `(min-width: ${BREAKPOINTS.desktop}px)`,
    );

    const getDeviceType = (): DeviceType => {
      if (desktopQuery.matches) return 'desktop';
      if (tabletQuery.matches) return 'tablet';
      return 'mobile';
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
  }, []);

  return deviceType;
}
