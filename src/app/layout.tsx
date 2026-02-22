import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ToastProvider";
import { UserProvider } from "@/components/UserProvider";
import { ModalProvider } from "@/components/ModalProvider";

const sfProDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro-Display-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/SF-Pro-Display-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const sfProRounded = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Pro-Rounded-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-rounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WINE4U",
  description: "와인 추천 및 리뷰 서비스",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${sfProDisplay.variable} ${sfProRounded.variable} flex min-h-screen flex-col antialiased`}
      >
        <UserProvider>
          <ToastProvider>
            <ModalProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </ModalProvider>
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}
