import { ProfileTabProvider } from "./_contexts/ProfileTabContext";

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileTabProvider>
      <div className="mx-auto flex min-h-screen w-full max-w-[1140px] flex-col md:flex-row">
        {children}
      </div>
    </ProfileTabProvider>
  );
}
