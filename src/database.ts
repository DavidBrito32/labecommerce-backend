import { TUser, TProduct } from "./types";

//functions

export const createUser = (
  id: string,
  name: string,
  email: string,
  password: string,
): string => {
  const user = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return "Usuario cadastrado com sucesso!";
};

export const createProducts = (
  id: string,
  name: string,
  price: number,
  description: string,
  imageUrl: string
): string => {
  const produto = {
    id,
    name,
    price,
    description,
    imageUrl,
  };

  products.push(produto);
  return "Produto cadastrado com sucesso!";
};

export const getAllUsers = (): TUser[] => {
  return users;
};

export const getProducts = (): TProduct[] => {
  return products;
};

export const searchProducts = (name: string): TProduct[] => {
  return products.filter((item) =>
    item.name.toLowerCase().includes(name.toLowerCase())
  );
};

//Arrays

export const users: Array<TUser> = [
  {
    id: "u001",
    name: "David Brito",
    email: "david@email.com",
    password: "1234",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u002",
    name: "Joao Alves",
    email: "joao_alves@email.com",
    password: "123456",
    createdAt: new Date().toISOString(),
  },
];

export const products: Array<TProduct> = [
  {
    id: "prod001",
    name: "Mouse Gamer",
    price: 250,
    description: " Melhor mouse gamer do mercado",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
  },
  {
    id: "prod002",
    name: "Monitor",
    price: 900,
    description: " Monitor LED Full HD 24 polegadas",
    imageUrl: "https://picsum.photos/seed/Monitor/400",
  },
];
