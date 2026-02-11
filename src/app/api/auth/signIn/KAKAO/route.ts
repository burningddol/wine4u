import { NextRequest } from "next/server";
import { handleAuthPost } from "../../_libs/authPost";

export async function POST(request: NextRequest) {
  return handleAuthPost(request, "signIn/KAKAO");
}
