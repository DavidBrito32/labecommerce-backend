"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
// console.log(createProducts("prod003", "Microfone Fifine", 240, "Um microfone muito bom", "https://www.fifinemicrofones.com.br/cdn/shop/products/Sdf7e1614dc8b4cbea2898cf1d3554059I.jpg?v=1682810299"));
console.log("\n");
// console.log(getAllUsers());
console.log((0, database_1.searchProducts)("gamer"));
