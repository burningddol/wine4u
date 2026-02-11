"use client";

import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "./CustomInput";
import Link from "next/link";
import Image from "next/image";
import type { FocusTarget } from "./Character";
import { cn } from "@/libs/utils";
import { ReactNode } from "react";

export interface FieldConfig {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  forPassword?: boolean;
  focusTarget: FocusTarget;
}

interface AuthFormProps<T extends Record<string, string>> {
  fields: FieldConfig[];
  initialValues: T;
  validationSchema: any;
  onSubmit: (values: T, actions: FormikHelpers<T>) => Promise<void>;
  isLoading: boolean;
  submitLabel: string;
  bottomText: string;
  bottomLinkText: string;
  bottomLinkHref: string;
  onFocusChange: (target: FocusTarget) => void;
  onTypingChange: (typing: boolean) => void;
  extraButtons?: ReactNode;
}

export default function AuthForm<T extends Record<string, string>>({
  fields,
  initialValues,
  validationSchema,
  onSubmit,
  isLoading,
  submitLabel,
  bottomText,
  bottomLinkText,
  bottomLinkHref,
  onFocusChange,
  onTypingChange,
  extraButtons,
}: AuthFormProps<T>) {
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
      <Formik<T>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="flex w-full flex-col">
            {fields.map((field, index) => (
              <CustomInput
                key={index}
                label={field.label}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                forPassword={field.forPassword}
                onFocus={() => onFocusChange(field.focusTarget)}
                onBlur={() => onFocusChange("none")}
                onKeyDown={() => onTypingChange(true)}
                onKeyUp={() => onTypingChange(false)}
              />
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
              {isLoading ? "제출중..." : submitLabel}
            </button>

            {extraButtons}

            <span
              className={cn(
                "mt-2.5 flex items-center justify-center",
                "text-sm font-normal text-gray-800",
              )}
            >
              {bottomText}
              <Link
                href={bottomLinkHref}
                className="ml-1 text-[#1b18fc] underline"
              >
                {bottomLinkText}
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
}
