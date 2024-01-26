"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.users = exports.searchProducts = exports.getProducts = exports.getAllUsers = exports.createProducts = exports.createUser = void 0;
//functions
const createUser = (id, name, email, password) => {
    const user = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
    };
    exports.users.push(user);
    return "Usuario cadastrado com sucesso!";
};
exports.createUser = createUser;
const createProducts = (id, name, price, description, imageUrl) => {
    const produto = {
        id,
        name,
        price,
        description,
        imageUrl,
    };
    exports.products.push(produto);
    return "Produto cadastrado com sucesso!";
};
exports.createProducts = createProducts;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
const getProducts = () => {
    return exports.products;
};
exports.getProducts = getProducts;
const searchProducts = (name) => {
    return exports.products.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
};
exports.searchProducts = searchProducts;
//Arrays
exports.users = [
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
exports.products = [
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
