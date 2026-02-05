'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import AuthSection from './AuthSection';

const HIDE_ON = ['/login', '/signup'];

export default function Header() {
  const pathname = usePathname();

  if (HIDE_ON.includes(pathname)) return null;
  return (
    <header className="fixed top-0 left-1/2 z-100 h-[70px] w-full -translate-x-1/2">
      <div className="mx-auto h-[70px] bg-[#101318] px-[50px]">
        <nav className="flex h-full items-center justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="WINE logo" width={52} height={15} />
          </Link>

          <AuthSection />
        </nav>
      </div>
    </header>
  );
}
