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
    <div className="flex w-full max-w-[1140px] min-h-screen mx-auto">
      {/* 프로필 사이드바 */}
      <ProfileSidebar />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 border-l border-gray-200">
        {/* 네비게이션 탭 */}
        <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 px-10">
          <div className="flex gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`pt-9 pb-5 text-xl font-bold ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* 콘텐츠 */}
        <div className="py-10 px-8">
          {children}
        </div>
      </main>
    </div>
  );
}