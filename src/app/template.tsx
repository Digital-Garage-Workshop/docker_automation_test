// src/app/template.tsx
import { Suspense } from "react";
import { getSession } from "next-auth/react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Loading from "./loading";
import Providers from "@/providers/Providers";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    // <ErrorBoundary>
    <Suspense fallback={<Loading />}>
      <Providers session={session}>{children}</Providers>
    </Suspense>
    // </ErrorBoundary>
  );
}
