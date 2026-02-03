import axios from '@/libs/api/axios';
import {
  AccessToken,
  LoginData,
  SignUpData,
  UserLogin,
  UserSignUp,
} from '@/types/auto/types';

export async function postSignUpData(
  signUpData: SignUpData,
): Promise<UserSignUp> {
  const res = await axios.post('/auth/signUp', signUpData);
  const data = res.data;

  return data;
}

export async function postLoginData(LoginData: LoginData): Promise<UserLogin> {
  const res = await axios.post('/auth/signIn', LoginData);
  const data = res.data;

  return data;
}

export async function getRefreshToken(
  refreshToken: string | null,
): Promise<AccessToken | null> {
  if (!refreshToken) return null;
  const res = await axios.post('/auth/refresh-token', {
    refreshToken,
  });
  const data = res.data;

  return data;
}
