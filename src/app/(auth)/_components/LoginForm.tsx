"use client";

import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "./CustomInput";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FocusTarget } from "./Character";
import Image from "next/image";
import { LoginFormValues, loginSchema } from "../_libs/authSchema";
import { LoginData } from "@/types/auth/types";
import { postLoginData } from "../../../libs/api/auth/getAPIAuth";
import { useToast } from "@/components/ToastProvider";
import { useUser } from "@/components/UserProvider";
import { cn } from "@/libs/utils";

interface SignUpFormProps {
  onFocusChange: (target: FocusTarget) => void;
  onTypingChange: (typing: boolean) => void;
}

interface CustomProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  forPassword?: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: () => void;
  onKeyUp: () => void;
}

export default function LoginForm({
  onFocusChange,
  onTypingChange,
}: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { setUser } = useUser();

  const { showToast } = useToast();

  const customProps: CustomProps[] = [
    {
      label: "이메일",
      name: "email",
      type: "email",
      placeholder: "codeit@email.com",
      autoComplete: "email",
      onFocus: () => onFocusChange("email"),
      onBlur: () => onFocusChange("none"),
      onKeyDown: () => onTypingChange(true),
      onKeyUp: () => onTypingChange(false),
    },

    {
      label: "비밀번호",
      name: "password",
      type: "password",
      placeholder: "비밀번호를 입력하세요",
      autoComplete: "new-password",
      forPassword: true,
      onFocus: () => onFocusChange("password"),
      onBlur: () => onFocusChange("none"),
      onKeyDown: () => onTypingChange(true),
      onKeyUp: () => onTypingChange(false),
    },
  ];

  const handleKakaoLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL!;
  };

  const onSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>,
  ) => {
    setIsLoading(true);
    const LoginData: LoginData = {
      email: values.email,

      password: values.password,
    };
    try {
      const data = await postLoginData(LoginData);
      setUser(data.user);

      showToast("로그인에 성공했습니다", "success");

      router.replace("/");
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "로그인에 실패했습니다";

      console.log(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
      actions.resetForm();
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-9 md:gap-18">
      <Link href="/">
        <Image
          src="/auth/logo.svg"
          width={104}
          height={30}
          alt="logo"
          className="align-contents-center"
        />
      </Link>
      <Formik<LoginFormValues>
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="flex w-full flex-col">
            {customProps.map((props, index) => (
              <CustomInput key={index} {...props} />
            ))}

            <button
              className={cn(
                "bg-primary h-14 w-full cursor-pointer rounded-sm",
                "text-xl font-normal text-white",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
              disabled={isSubmitting || !isValid || !dirty}
              type="submit"
            >
              {isLoading ? "제출중..." : "로그인"}
            </button>

            <button
              className={cn(
                "mt-2 flex h-14 w-full cursor-pointer",
                "items-center justify-center gap-2 border border-1",
                "rounded-sm bg-white text-xl font-normal text-black",
              )}
              type="button"
              onClick={handleKakaoLogin}
            >
              <Image
                src="/auth/kakao.svg"
                width={24}
                height={24}
                alt="카카오 로고"
              />
              카카오 간편로그인
            </button>

            <span
              className={cn(
                "mt-2.5 flex items-center justify-center",
                "text-sm font-normal text-gray-800",
              )}
            >
              처음 방문하셨나요?
              <Link href="/signup" className="ml-1 text-[#1b18fc] underline">
                회원가입
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}
