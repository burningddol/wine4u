import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { cookieOptions, tryRefresh } from "../../_libs/refresh";

// 나중에 환경변수로 ㅇ
const API_BASE = "https://winereview-api.vercel.app/14-2";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const endpoint = path[0];
  const cookieStore = await cookies();

  // 로그아웃, 로그인, 회원가입 귀찮아서 한번에 묶어서 처리함 추후 분리할지는 고민
  // 로그아웃
  if (endpoint === "logout") {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return NextResponse.json({ success: true });
  }

  // 로그인/회원가입 (signIn/KAKAO도 포함)
  if (endpoint === "signIn" || endpoint === "signUp") {
    const body = await request.json();
    const res = await fetch(`${API_BASE}/auth/${path.join("/")}`, {
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

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  if (path[0] !== "me")
    return NextResponse.json({ error: "Not found" }, { status: 404 });

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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  if (path[0] !== "me") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const cookieStore = await cookies();
  let token = cookieStore.get("access_token")?.value;
  if (!token) {
    token = await tryRefresh(cookieStore);
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const fetchOpts = {
    method: "PATCH" as const,
    headers,
    body: JSON.stringify(body),
  };

  let res = await fetch(`${API_BASE}/users/me`, fetchOpts);
  if (res.status === 404) {
    res = await fetch(`${API_BASE}/auth/me`, fetchOpts);
  }

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
