'use client';

import { useField } from 'formik';
import { InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  forPassword?: boolean;
}

export default function CustomInput({
  forPassword = false,
  label,
  ...props
}: CustomInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [field, meta] = useField(props.name!);
  const hasError = meta.touched && !!meta.error;
  const passwordState: 'text' | 'password' = isVisible ? 'text' : 'password';

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    field.onBlur(e);
    props.onBlur?.(e);
  };
  console.log(label);
  return (
    <div className="mb-6 flex w-full flex-col items-start justify-start gap-2 text-gray-800">
      <label className="font-md text-black">{label}</label>
      <div className="relative w-full">
        <input
          {...field}
          {...props}
          onBlur={handleBlur}
          type={forPassword ? passwordState : props.type}
          className={`h-14 w-full rounded-sm border border-1 bg-white px-6 text-base focus:outline-none ${
            hasError ? 'border-[#ff0000]' : 'border-gray-300'
          }`}
        />
        {forPassword && (
          <button
            className="absolute top-4 right-5 h-6 w-6 cursor-pointer"
            onClick={() => setIsVisible((prev) => !prev)}
            type="button"
          >
            <Image
              src={
                isVisible ? '/icons/visibility_on.png' : '/icons/visibility.png'
              }
              alt={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {meta.touched && meta.error && (
        <span className="text-error pl-4 text-sm font-normal">
          {meta.error}
        </span>
      )}
    </div>
  );
}
