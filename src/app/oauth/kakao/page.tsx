import { Suspense } from "react";
import KakaoCallback from "./_components/KakaoCallback";

export default function KakaoCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-lg text-gray-600">카카오 로그인 처리 중...</p>
        </div>
      }
    >
      <KakaoCallback />
    </Suspense>
  );
}
