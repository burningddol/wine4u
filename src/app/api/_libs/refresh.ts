import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE = "https://winereview-api.vercel.app/21-310338";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export function clearAuthCookies(res: NextResponse) {
  res.cookies.delete("access_token");
  res.cookies.delete("refresh_token");
}

export async function tryRefresh(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): Promise<string | null> {
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) return null;

  const res = await fetch(`${API_BASE}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return null;

  const { accessToken } = await res.json();
  cookieStore.set("access_token", accessToken, {
    ...cookieOptions,
    maxAge: 60 * 30,
  });
  return accessToken;
}
