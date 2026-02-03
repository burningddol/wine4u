import { create } from 'zustand';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceTypeStore {
  deviceType: DeviceType;
  setDeviceType: (deviceType: DeviceType) => void;
}

export const useDeviceTypeStore = create<DeviceTypeStore>((set) => ({
  deviceType: 'desktop',
  setDeviceType: (deviceType) => set({ deviceType }),
}));
