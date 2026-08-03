export type JournalImage = {
  alt: string;
  src: string;
};

export type JournalArticle = {
  author: string;
  category: string;
  excerpt: string;
  image: JournalImage;
  location?: string;
  number: string;
  publishedAt: string;
  slug: string;
  title: string;
};
