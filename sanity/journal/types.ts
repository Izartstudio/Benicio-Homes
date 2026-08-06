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

export type JournalSpan = {
  _key: string;
  _type: "span";
  marks?: string[];
  text: string;
};

export type JournalBodyBlock = {
  _key: string;
  _type: "block";
  children?: JournalSpan[];
  style?: "normal" | "h2" | "h3" | "blockquote";
};

export type JournalBodyImage = {
  _key: string;
  _type: "image";
  alt?: string;
  caption?: string;
  imageUrl: string;
};

export type JournalPost = JournalArticle & {
  body: Array<JournalBodyBlock | JournalBodyImage>;
};
