import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { tryRefresh } from "../_libs/refresh";

const API_BASE = "https://winereview-api.vercel.app/14-2";

async function proxy(req: NextRequest, path: string[], method: string) {
  const cookieStore = await cookies();
  let token = cookieStore.get("access_token")?.value;
  const targetUrl = `${API_BASE}/${path.join("/")}${new URL(req.url).search}`;

  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const body =
    method === "GET"
      ? undefined
      : JSON.stringify(await req.json().catch(() => ({})));

  let res = await fetch(targetUrl, { method, headers, body });

  //access토큰 만료시 refreshing
  if (res.status === 401) {
    const newToken = await tryRefresh(cookieStore);
    if (newToken) {
      headers["Authorization"] = `Bearer ${newToken}`;
      res = await fetch(targetUrl, { method, headers, body });
    }
  }

  return NextResponse.json(await res.json().catch(() => ({})), {
    status: res.status,
  });
}

type RouteParams = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
  return proxy(req, (await params).path, "GET");
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  return proxy(req, (await params).path, "POST");
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  return proxy(req, (await params).path, "PATCH");
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  return proxy(req, (await params).path, "DELETE");
}
