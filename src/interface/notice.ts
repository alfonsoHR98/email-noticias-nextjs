type Notice = {
  status: string;
  totalResults: number;
  articles: Article[];
};

type Article = {
  source: Source;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | undefined;
  publishedAt: string;
  content: string | null;
};

type Source = {
  id: string | null;
  name: string;
};

type DataSend = {
  category: string;
  country: string;
  from: string;
  language: string;
  q: string;
  selected: boolean;
  sortBy: string;
  to: string;
};

export type { Notice, Article, Source, DataSend };
