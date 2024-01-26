-- Active: 1703025779984@@127.0.0.1@3306
CREATE TABLE
    IF NOT EXISTS users (
        id TEXT UNIQUE NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

drop TABLE users;

-- CRIANDO A TABELA DE PRODUTOS
CREATE TABLE
    IF NOT EXISTS products (
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

-- TABELA PURCHASES
CREATE TABLE
    IF NOT EXISTS purchases (
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (buyer) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE purchases;

PRAGMA table_info (purchases);

CREATE TABLE
    IF NOT EXISTS purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE "purchases_products";

INSERT INTO
    purchases_products ("purchases_id", "product_id", "quantity")
VALUES
    ('p003', 'p003', '20');

SELECT
    *
FROM
    purchases_products
    INNER JOIN products ON products.id = purchases_products."product_id"
    INNER JOIN purchases ON purchases.id = purchases_products."purchases_id"
    INNER JOIN users ON users.id = purchases.buyer;

SELECT
    *
FROM
    users;

PRAGMA table_info (users);

PRAGMA table_info (products);

PRAGMA table_info (purchases);

PRAGMA table_info (purchases_products);

SELECT
    *
FROM
    users;

SELECT
    *
FROM
    products;

SELECT
    *
FROM
    purchases;

SELECT
    *
FROM
    purchases_products;

insert into
    purchases (id, buyer, total_price)
VALUES
    ('p003', 'u001', 850);

INSERT INTO
    purchases_products (purchases_id, product_id, quantity)
VALUES
    ('p001', 'p010', 2);