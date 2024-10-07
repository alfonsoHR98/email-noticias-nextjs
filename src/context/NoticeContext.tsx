"use client";
import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { Article, DataSend } from "@interface/notice";

export const NoticeContext = createContext<{
  notices: Article[];
  getNotices: (data: DataSend) => void;
}>({
  notices: [],
  getNotices: () => { },
});

export const useNotice = () => {
  const context = useContext(NoticeContext);
  if (!context) {
    throw new Error("useNotice must be used within a NoticeProvider");
  }
  return context;
};

export const NoticeProvider = ({ children }: { children: React.ReactNode }) => {
  const [notices, setNotices] = useState<Article[]>([]);

  const getNotices = async (data: DataSend) => {
    try {
      const res = await axios.post("/api/news", data);
      setNotices(res.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  return <NoticeContext.Provider value={{
    notices,
    getNotices,
  }}>{children}</NoticeContext.Provider>;
};
