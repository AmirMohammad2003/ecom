export type Product = {
  image: string | undefined;
  name: string;
  slug: string;
  price: number;
  id: number;
  description: string;
  category: string;
};

export type Category = {
  name: string;
  slug: string;
};
