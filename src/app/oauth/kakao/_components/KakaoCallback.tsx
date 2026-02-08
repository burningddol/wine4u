"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { postKakaoLoginData } from "@/libs/api/auth/getAPIAuth";
import { useUser } from "@/components/UserProvider";
import { useToast } from "@/components/ToastProvider";

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useUser();
  const { showToast } = useToast();
  const isProcessing = useRef(false);

  useEffect(() => {
    if (isProcessing.current) return;
    isProcessing.current = true;

    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      showToast("에러가 발생했습니다.", "error");
      router.replace("/login");
      return;
    }

    if (!code) {
      showToast("잘못된 접근입니다.", "error");
      router.replace("/login");
      return;
    }

    const handleKakaoLogin = async () => {
      try {
        const data = await postKakaoLoginData({
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
          token: code,
        });
        setUser(data.user);
        showToast("카카오 로그인에 성공했습니다!", "success");
        router.replace("/");
      } catch (e: any) {
        const errorMessage =
          e.response?.data?.message || "카카오 로그인에 실패했습니다.";
        console.error("Kakao login error:", errorMessage);
        showToast(errorMessage, "error");
        router.replace("/login");
      }
    };

    handleKakaoLogin();
  }, [searchParams, router, setUser, showToast]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-lg text-gray-600">카카오 로그인 처리 중...</p>
    </div>
  );
}
