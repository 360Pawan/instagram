export type User = {
  id: string;
  name: string;
  email: string | null;
};

export type PostType = {
  author: string;
  authorId: string;
  description: string;
  imageUrl: string;
  location: string;
  id: string;
  likes: string[];
};
