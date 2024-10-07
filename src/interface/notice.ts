type Notice = {
  status: string;
  totalResults: number;
  articles: Article[];
}

type Article = {
  source: Source;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

type Source = {
  id: string | null;
  name: string;
};

export type { Notice, Article, Source };