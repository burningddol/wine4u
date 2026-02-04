'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileSidebar from './_components/ProfileSidebar';

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/myprofile/reviews', label: `내가 쓴 후기 ${0}` },
    { href: '/myprofile/register', label: `내가 등록한 와인 ${0}` },
  ];

  return (
    <div className="flex w-full max-w-[1140px] mx-auto">
      {/* 프로필 사이드바 */}
      <ProfileSidebar />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 border-l border-gray-300">
        {/* 네비게이션 탭 */}
        <nav className="border-b border-gray-300 px-5">
          <div className="flex gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-4 font-medium transition-colors relative ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* 콘텐츠 */}
        <div className="py-7 px-5">
          {children}
        </div>
      </main>
    </div>
  );
}