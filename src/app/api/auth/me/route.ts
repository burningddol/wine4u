import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { tryRefresh } from "../../_libs/refresh";

const API_BASE = "https://winereview-api.vercel.app/14-2";

export async function GET() {
  const cookieStore = await cookies();
  const fetchMe = (t: string) =>
    fetch(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${t}` },
    });

  let token = cookieStore.get("access_token")?.value;
  let res = token ? await fetchMe(token) : null;

  // 토큰 없거나 401이면 refresh 후 재시도
  if (!res || res.status === 401) {
    token = await tryRefresh(cookieStore);
    if (!token) return NextResponse.json({ user: null });
    res = await fetchMe(token);
  }

  if (!res.ok) return NextResponse.json({ user: null });
  return NextResponse.json({ user: await res.json() });
}
