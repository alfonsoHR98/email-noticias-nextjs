"use client"
import React from 'react';
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </SessionProvider>
  );
}