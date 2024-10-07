"use client";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const dateNow = new Date();
  const dateExpire = session?.expires ? new Date(session.expires) : new Date(0);

  if (dateNow > dateExpire) {
    signOut();
  }

  if (session === null && req.url !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};