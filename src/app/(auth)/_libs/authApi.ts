import axios from "@/libs/api/axios";
import {
  AccessToken,
  LoginData,
  LoginedUser,
  SignUpData,
  UserLogin,
  UserSignUp,
} from "@/types/auth/types";
import { User } from "@/types/wines/types";

export async function postSignUpData(
  signUpData: SignUpData,
): Promise<UserSignUp> {
  const res = await axios.post("/auth/signUp", signUpData);
  const data = res.data;

  return data;
}

export async function postLoginData(LoginData: LoginData): Promise<UserLogin> {
  const res = await axios.post("/auth/signIn", LoginData);
  const data = res.data;

  return data;
}

export async function getUserData(): Promise<LoginedUser | any> {
  const res = await axios.get("/users/me");
  const data = res.data;

  return data;
}

export async function getRefreshToken(
  refreshToken: string | null,
): Promise<AccessToken | null> {
  if (!refreshToken) return null;
  const res = await axios.post("/auth/refresh-token", {
    refreshToken,
  });
  const data = res.data;

  return data;
}
