"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Logo from "@images/lgo-NK-transparent.png";

function LoginPage() {
  const handleSignIn = async () => {
    await signIn("google", {
      redirectTo: "/",
    });
  };

  return (
    <>
      <div className="relative h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
      </div>
      <div className="min-h-screen flex justify-center items-center p-4">
        <div className="mt-[-100px] flex flex-col items-center">
          <Image
            src={Logo}
            width={200}
            height={100}
            alt="Niuko Consultores"
            className="mb-6 drop-shadow-lg grayscale"
          />
          <h1 className="text-4xl font-bold text-center text-neutral-100">
            Niuko Consultores
          </h1>
          <h2 className="text-2xl font-semibold text-center text-neutral-500">
            Buscador de noticias
          </h2>
          <div className="flex flex-col gap-4 mt-8 w-full">
            <button
              onClick={handleSignIn}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 border hover:bg-neutral-600 text-neutral-100 rounded-md"
            >
              <FcGoogle />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
