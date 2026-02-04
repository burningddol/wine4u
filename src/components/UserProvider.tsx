'use client';

import { getUserData } from '@/app/(auth)/_libs/authApi';
import { LoginedUser } from '@/types/auto/types';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface UserContextValue {
  user: LoginedUser | null | 'isPending';
  setUser: (user: LoginedUser | null | 'isPending') => void;
}

const UserContext = createContext<UserContextValue | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [access, setAccess] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<string | null>(null);
  const [user, setUser] = useState<LoginedUser | null | 'isPending'>(
    'isPending',
  );

  const getMe = async (access: string | null) => {
    if (access || refresh) {
      setUser('isPending');

      try {
        const data = await getUserData();
        setUser(data);
      } catch (e) {
        console.log(e);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    setAccess(localStorage.getItem('accessToken'));
    setRefresh(localStorage.getItem('refreshToken'));
  }, []);

  useEffect(() => {
    getMe(access);
  }, [access]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
