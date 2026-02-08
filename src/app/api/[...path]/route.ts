import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { tryRefresh } from "../_libs/refresh";

const API_BASE = "https://winereview-api.vercel.app/14-2";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";
type RouteParams = { params: Promise<{ path: string[] }> };

async function proxy(req: NextRequest, path: string[], method: HttpMethod) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const targetUrl = `${API_BASE}/${path.join("/")}${new URL(req.url).search}`;
  const contentType = req.headers.get("content-type") ?? "";
  const isMultipart = contentType.includes("multipart/form-data");

  //img 폼데이터 용
  const headers: HeadersInit = {
    "Content-Type": isMultipart ? contentType : "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  let body: BodyInit | undefined;
  if (method !== "GET") {
    body = isMultipart
      ? await req.blob()
      : JSON.stringify(await req.json().catch(() => ({})));
  }

  let res = await fetch(targetUrl, { method, headers, body });

  if (res.status === 401) {
    const newToken = await tryRefresh(cookieStore);
    if (newToken) {
      headers["Authorization"] = `Bearer ${newToken}`;
      res = await fetch(targetUrl, { method, headers, body });
    }
  }

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return proxy(req, path, "GET");
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return proxy(req, path, "POST");
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return proxy(req, path, "PATCH");
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { path } = await params;
  return proxy(req, path, "DELETE");
}
