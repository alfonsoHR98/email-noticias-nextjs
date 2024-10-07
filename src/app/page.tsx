"use client";
import React from "react";
import SideBar from "@components/SideBar";
import NewCard from "@components/New-Card";
import { useNotice } from "@context/NoticeContext";

export default function Home() {
  const { notices } = useNotice();
  return (
    <div className="w-full h-full">
      <SideBar />
      <main className="overflow-y-auto max-w-[75%] m-auto mt-4 h-auto flex flex-col gap-4">
        {notices.map((elemento, index) => (
          <NewCard key={index} elemento={elemento} />
        ))}
      </main>
    </div>
  );
}
