'use client';

import { Form, Formik, FormikHelpers } from 'formik';
import CustomInput from './CustomInput';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FocusTarget } from './Character';
import Image from 'next/image';
import { SignUpFormValues, signUpSchema } from '../_libs/authSchema';
import { SignUpData } from '@/types/auto/types';
import { postSignUpData } from '../_libs/authApi';
import { useToast } from '@/components/Toast';
import { useUser } from '@/components/UserProvider';

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

export default function SignUpForm({
  onFocusChange,
  onTypingChange,
}: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { setUser } = useUser();

  const { showToast } = useToast();

  const customProps: CustomProps[] = [
    {
      label: '이메일',
      name: 'email',
      type: 'email',
      placeholder: 'codeit@email.com',
      autoComplete: 'email',
      onFocus: () => onFocusChange('email'),
      onBlur: () => onFocusChange('none'),
      onKeyDown: () => onTypingChange(true),
      onKeyUp: () => onTypingChange(false),
    },
    {
      label: '닉네임',
      name: 'nickname',
      type: 'text',
      placeholder: '닉네임을 입력해주세요',
      autoComplete: 'username',
      onFocus: () => onFocusChange('nickname'),
      onBlur: () => onFocusChange('none'),
      onKeyDown: () => onTypingChange(true),
      onKeyUp: () => onTypingChange(false),
    },
    {
      label: '비밀번호',
      name: 'password',
      type: 'password',
      placeholder: '비밀번호를 입력하세요',
      autoComplete: 'new-password',
      forPassword: true,
      onFocus: () => onFocusChange('password'),
      onBlur: () => onFocusChange('none'),
      onKeyDown: () => onTypingChange(true),
      onKeyUp: () => onTypingChange(false),
    },
    {
      label: '비밀번호 확인',
      name: 'confirmPassword',
      type: 'password',
      placeholder: '비밀번호를 다시 한 번 입력하세요',
      autoComplete: 'new-password',
      forPassword: true,
      onFocus: () => onFocusChange('password'),
      onBlur: () => onFocusChange('none'),
      onKeyDown: () => onTypingChange(true),
      onKeyUp: () => onTypingChange(false),
    },
  ];

  const onSubmit = async (
    values: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>,
  ) => {
    setIsLoading(true);
    const signUpData: SignUpData = {
      email: values.email,
      nickname: values.nickname,
      password: values.password,
      passwordConfirmation: values.confirmPassword,
    };
    try {
      const data = await postSignUpData(signUpData);
      setUser(data.user);

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      showToast('회원가입에 성공했습니다', 'success');
      router.replace('/');
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.message || '회원가입에 실패했습니다';

      console.log(errorMessage);
      showToast(errorMessage, 'error');
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
      <Formik<SignUpFormValues>
        initialValues={{
          email: '',
          nickname: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signUpSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="flex w-full flex-col">
            {customProps.map((props, index) => (
              <CustomInput key={index} {...props} />
            ))}

            <button
              className="bg-primary h-14 w-full cursor-pointer rounded-sm text-xl font-normal text-white disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting || !isValid || !dirty}
              type="submit"
            >
              {isLoading ? '제출중...' : '회원가입'}
            </button>

            <span className="mt-2.5 flex items-center justify-center text-sm font-normal text-gray-800">
              계정이 이미 있으신가요?
              <Link href="/login" className="ml-1 text-[#1b18fc] underline">
                로그인
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}
