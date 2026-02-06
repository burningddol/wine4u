import axios from "@/libs/api/axios";
import { LoginData, LoginedUser, SignUpData, User } from "@/types/auth/types";

interface AuthResponse {
  user: User;
}

export async function postSignUpData(
  signUpData: SignUpData,
): Promise<AuthResponse> {
  const res = await axios.post("/auth/signUp", signUpData);
  return res.data;
}

export async function postLoginData(
  loginData: LoginData,
): Promise<AuthResponse> {
  const res = await axios.post("/auth/signIn", loginData);
  return res.data;
}

export async function getUserData(): Promise<LoginedUser | null> {
  try {
    const res = await axios.get("/auth/me");
    return res.data.user;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  await axios.post("/auth/logout");
}

export interface KakaoLoginData {
  redirectUri: string;
  token: string;
}

export async function postKakaoLoginData(
  kakaoData: KakaoLoginData,
): Promise<AuthResponse> {
  const res = await axios.post("/auth/signIn/KAKAO", kakaoData);
  return res.data;
}
