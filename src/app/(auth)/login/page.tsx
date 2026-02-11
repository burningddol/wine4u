"use client";

import AuthLayout from "../_components/AuthLayout";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      {(props) => <LoginForm {...props} />}
    </AuthLayout>
  );
}
