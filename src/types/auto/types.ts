export interface SignUpData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginData {
  email: string;

  password: string;
}

export interface User {
  id: number;
  email?: string;
  image?: string;
  nickname: string;
  updatedAt?: string;
  createdAt?: string;
  teamId?: string;
}

export interface UserLogin {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface UserSignUp extends UserLogin {}

export type Tokens = Omit<UserLogin, 'user'>;

export type AccessToken = Omit<Tokens, 'refreshToken'>;
