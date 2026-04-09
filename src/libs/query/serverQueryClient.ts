import { QueryClient } from "@tanstack/react-query";

// 요청 간 상태 공유를 막기 위해 요청마다 새 인스턴스를 생성한다
export function createServerQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}
