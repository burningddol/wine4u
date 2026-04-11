"use client";

import { Suspense } from "react";
import AuthLayout from "../_components/AuthLayout";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      {(props) => (
        <Suspense>
          <LoginForm {...props} />
        </Suspense>
      )}
    </AuthLayout>
  );
}
