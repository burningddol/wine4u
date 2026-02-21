import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { cookieOptions } from "../../_libs/refresh";

const API_BASE = "https://winereview-api.vercel.app/21-310338";

export async function handleAuthPost(request: NextRequest, apiPath: string) {
  const cookieStore = await cookies();
  const body = await request.json();

  const res = await fetch(`${API_BASE}/auth/${apiPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) return NextResponse.json(data, { status: res.status });

  cookieStore.set("access_token", data.accessToken, {
    ...cookieOptions,
    maxAge: 60 * 30,
  });
  cookieStore.set("refresh_token", data.refreshToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ user: data.user });
}
