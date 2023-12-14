-- Active: 1702592586696@@127.0.0.1@3306

-- CRIANDO A TABELA DE USUARIOS
CREATE TABLE IF NOT EXISTS users(
    id TEXT UNIQUE NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

INSERT INTO users(id, name, email, password, created_at)
VALUES
('u007', 'Maicon', 'maicon@email.com', '15487Ad*', CURRENT_TIMESTAMP);

SELECT * FROM users;

-- CRIANDO A TABELA DE PRODUTOS


CREATE TABLE IF NOT EXISTS products(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products(id, name, price, description, image_url)
VALUES
('p001', 'Mouse Redragon', 332.45, 'Um mouse muito bom pelo que ele oferece', 'https://www.kabum.com.br/busca/mouse-redragon'),
('p002', 'Intel Core I9 14900k', 5332.45, 'Melhor Processador da atualidade', 'https://www.kabum.com.br/busca/mouse-redragon'),
('p003', 'Ryzen 7 7700', 2332.45, 'Processador Muito Robusto', 'https://www.kabum.com.br/busca/mouse-redragon');