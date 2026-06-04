import { Suspense } from "react";

const ResetPasswordLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<div>Please wait...</div>}>{children}</Suspense>;
};

export default ResetPasswordLayout;
