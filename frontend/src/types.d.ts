export interface INews {
  id: string;
  title: string;
  description: string;
  image: string | null;
  create_date: string;
}

export type NewsWithoutId = Omit<Item, 'id',' create_date'>

export interface NewsMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface IComment {
  id: string;
  news_id: string;
  author: string;
  description: string;
}



