-- Active: 1703025779984@@127.0.0.1@3306

CREATE TABLE
    IF NOT EXISTS users (
        id TEXT UNIQUE NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

INSERT INTO
    users (id, name, email, password, created_at)
VALUES
    (
        'u007',
        'Maicon',
        'maicon@email.com',
        '15487Ad*',
        CURRENT_TIMESTAMP
    );

SELECT
    *
FROM
    users;

PRAGMA table_info (users);

-- CRIANDO A TABELA DE PRODUTOS
CREATE TABLE
    IF NOT EXISTS products (
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

SELECT
    *
FROM
    products;

INSERT INTO
    products (id, name, price, description, image_url)
VALUES
    (
        'p008',
        'Gamer hub engine',
        25332.45,
        'Melhor Engine Do momento',
        'https://www.kabum.com.br/busca/gamer-hub'
    );

-- Exercicio 1
SELECT
    *
FROM
    users;

-- GET ALL USERS
-- Exercicio 2
SELECT
    *
FROM
    products;

-- GET ALL PRODUCTS
SELECT
    *
FROM
    products
WHERE
    name LIKE '%gamer%';

-- Exercicio 3
INSERT INTO
    users (id, name, email, password, created_at)
VALUES
    (
        'u009',
        'Leonardo',
        'leonardo@email.com',
        'leonardo1234',
        CURRENT_TIMESTAMP
    );

    select * from users WHERE id = 'u003';

-- INSERT NA TABELA USERS;
INSERT INTO
    products (id, name, price, description, image_url)
VALUES
    (
        'p011',
        'Produto',
        20,
        'Um produto',
        'https://www.kabum.com.br/?product=produto'
    );

-- Create Product
DELETE FROM users
WHERE
    id = 'u002'; -- Delete user

DELETE FROM products
WHERE
    id = 'p002'; -- Delete product

UPDATE products
SET
    name = 'Mudei de nome',
    price = 455.58,
    description = 'O melhor da categoria mudada',
    image_url = 'https://www.kabum.com.br/busca/mouse-redragon'
WHERE
    id = 'p001'; -- Edit Product

    select * from products;