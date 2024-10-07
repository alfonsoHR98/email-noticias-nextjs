"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { NoticeProvider } from "@context/NoticeContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NoticeProvider>{children}</NoticeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
