import { cookies } from "next/headers";

const API_BASE = "https://winereview-api.vercel.app/14-2";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export async function tryRefresh(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): Promise<string | undefined> {
  const refreshToken = cookieStore.get("refresh_token")?.value;

  const cleanup = () => {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return undefined;
  };

  if (!refreshToken) return cleanup();

  const res = await fetch(`${API_BASE}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return cleanup();

  const { accessToken } = await res.json();
  cookieStore.set("access_token", accessToken, {
    ...cookieOptions,
    maxAge: 60 * 30,
  });
  return accessToken;
}
