'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HIDE_ON = ['/login', '/signup'];

export default function Header() {
  const pathname = usePathname();
  if (HIDE_ON.includes(pathname)) return null;
  return (
    <header className="h-[110px] w-full md:mt-[27px] xl:mt-[40px]">
      <div className="mx-auto h-[70px] max-w-[1140px] rounded-2xl bg-[#101318] px-[60px]">
        <nav className="flex h-full items-center justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="WINE logo" width={52} height={15} />
          </Link>
          <ul className="flex items-center gap-10">
            <li>
              <Link href="/login" className="text-base font-medium text-white">
                로그인
              </Link>
            </li>
            <li>
              <Link href="/signup" className="text-base font-medium text-white">
                회원가입
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
