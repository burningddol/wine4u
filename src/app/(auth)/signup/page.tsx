"use client";

import AuthLayout from "../_components/AuthLayout";
import SignUpForm from "../_components/SignUpForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      {(props) => <SignUpForm {...props} />}
    </AuthLayout>
  );
}
