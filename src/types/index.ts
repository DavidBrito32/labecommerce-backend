export type TUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
};

export type TProduct = {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
    image_url?: string;
};

export type TPurchase = {
  id: string;
  buyer: string;
  total_price: number;
  created_at: string;
}