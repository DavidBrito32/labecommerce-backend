import express, { Request, Response } from "express";
import cors from "cors";
import {  TProduct, TPurchase, TUser } from "./types";
import { db } from "./database/knex";

const app = express();
app.use(express.json());
app.use(cors());
const port = 3003;

//USERS ENDPOINTS
app.get("/users", async (req: Request, res: Response) => {
  try {
    const name = req.query.name;
    if (name) {
      if (typeof name !== "string") {
        res.statusCode = 400;
        throw new Error("'name' - deve ser uma string");
      }
      const search = await db
        .select("*")
        .from("users")
        .where("name", "LIKE", `%${name}%`);
      console.log(search);
      return res.status(200).send(search);
    }

    const usuarios: Array<TUser> = await db.select("*").from("users");

    res.status(200).send(usuarios);
  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }
    res.send("Erro inesperado");
  }
}); // ✅ QUERY BUILDER OK

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    if (id === undefined || name === undefined || email === undefined || password === undefined ) {
      res.statusCode = 400;
      throw new Error(
        "O body deve corresponder com todos esses atributos: 'id' - 'name' - 'email' - 'password'"
      );
    }

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.statusCode = 400;
        throw new Error("'id' - Deve ser um string");
      }
      if (id[0] !== "u") {
        res.status(400);
        throw new Error("O 'id' - deve começar com a letra 'u'");
      }
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' - deve ser uma string");
    }

    if (name.length < 2) {
      res.status(400);
      throw new Error("'name' - deve conter mais de 2 caracteres");
    }

    if (typeof email !== "string") {
      res.status(400);
      throw new Error("'email' - deve ser uma string");
    }

    if (typeof password !== "string") {
      res.statusCode = 400;
      throw new Error("'password' - Deve ser do Tipo string");
    }

    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
      res.statusCode = 400;
      throw new Error(
        "'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
      );
    }

    await db
      .insert({
        id,
        name,
        email,
        password,
      })
      .into("users");

    res.status(201).send("Cadastro realizado com sucesso");
  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }
    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Erro inesperado");
    }
  }
}); // ✅ QUERY BUILDER OK

app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToEdit: string = req.params.id; // id do usuario
    const [buscarUser]: Array<TUser> = await db.select("*").from("users").where({id: idToEdit});

    if (!buscarUser) {
      res.statusCode = 404;
      throw new Error("Usuario não encontrado");
    }

    const { id, name, email, password } = req.body;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.statusCode = 400;
        throw new Error("'id' - Deve ser em formato string");
      }
    }
    if (name !== undefined) {
      if (typeof name !== "string") {
        res.statusCode = 400;
        throw new Error("'name' - Deve ser em formato string");
      }

      if (name.length < 2) {
        res.statusCode = 400;
        throw new Error("'name' - deve conter mais de 2 caracteres");
      }
    }
    if (email !== undefined) {
      if (typeof email !== "string") {
        res.statusCode = 400;
        throw new Error("'email' - Deve ser em formato string");
      }

      if (!email.includes("@")) {
        res.statusCode = 400;
        throw new Error("'email' - Deve incluir o @ ex: fulano@email.com");
      }
    }
    if (password !== undefined) {
      if (typeof password !== "string") {
        res.statusCode = 400;
        throw new Error("'password' - Deve ser em formato string");
      }
      if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
        res.statusCode = 400;
        throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
      }
    }

    await db.update({
        id: id || buscarUser.id,
        name: name || buscarUser.name,
        email: email || buscarUser.email,
      })
      .from("users")
      .where({ id: idToEdit });

    res.status(201).send("Informações atualizadas com sucesso!");
  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }

    if (err instanceof Error) {
      res.send(err.message);
    }
  }
}); // ✅ QUERY BUILDER OK

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete: string = req.params.id;
    const [user] = await db.select("*").from("users").where({id: idToDelete});   

    if (!user) {
      res.statusCode = 404;
      throw new Error("Usuario não encontrado");
    }

    await db.delete().from("users").where({ id: idToDelete });

    res.status(200).send("Usuario deletado com sucesso");
  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Erro inesperado");
    }
  }
}); // ✅ QUERY BUILDER OK

//************************************************************** */
//PRODUCTS ENDPOINTS

app.get("/products", async (req: Request, res: Response) => {
  //VER TODOS OS PRODUTOS
  try {
    const name = req.query.name as string;

    if (name !== undefined) {
      if (name.length < 1) {
        res.statusCode = 400;
        throw new Error("'name' - query params deve possuir pelo menos um caractere");
      }

      const search: Array<TProduct> = await db
        .select("*")
        .from("products")
        .where("name", "LIKE", `%${name}%`);
      return res.status(200).send(search);
    }

    const products: Array<TProduct> = await db.select("*").from("products");

    res.status(200).send(products);
  } catch (err) {
    if (req.statusCode === 200) {
      req.statusCode = 500;
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Erro inesperado");
    }
  }
}); // ✅ QUERY BUILDER OK + QUERY PARAMITERS

app.post("/products", async (req: Request, res: Response) => {
  //CADASTRO DE NOVOS PRODUTOS
  try {
    const { id, name, price, description, imageUrl: image_Url} = req.body;

    if (id === undefined || name === undefined || price === undefined || description === undefined || image_Url === undefined) {
      res.statusCode = 400;
      throw new Error(
        "O body deve corresponder com todos esses atributos: 'id' - 'name' - 'price' - 'description' - 'imageUrl'"
      );
    }
    if (id !== undefined) {
      if (typeof id !== "string") {
        res.statusCode = 400;
        throw new Error("'id' - Precisa ser uma string");
      }

      if (!id.includes("prod")) {
        res.statusCode = 400;
        throw new Error("'id' - Precisa corresponder ao padrão: 'prod000'");
      }
    }
    if (typeof name !== "string") {
      res.statusCode = 400;
      throw new Error("'name' - Precisa ser uma string");
    }
    if (name.length < 2) {
      res.statusCode = 400;
      throw new Error("'name' - Precisa ter mais de 2 caracteres");
    }
    if (typeof price !== "number") {
      res.statusCode = 400;
      throw new Error("'price' - Deve ser enviado como um number");
    }
    if (typeof description !== "string") {
      res.statusCode = 400;
      throw new Error("'description' - Deve ser uma string");
    }
    if (typeof image_Url !== "string") {
      res.statusCode = 400;
      throw new Error("'imageUrl' - Deve ser uma string");
    }

    await db
      .insert({
        id,
        name,
        price,
        description,
        image_Url,
      })
      .into("products");

    res.status(201).send("Produto cadastrado com sucesso");
  } catch (err) {
    if (req.statusCode === 200) {
      req.statusCode = 500;
    }
    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Erro inesperado");
    }
  }
}); // ✅ QUERY BUILDER OK

app.put("/products/:id", async (req: Request, res: Response) => {
  //EDIÇÃO DE PRODUTOS
  try {
    const idToEdit = req.params.id; // id do produto

    const [product]: Array<TProduct> = await db.select("*").from("products").where({id: idToEdit});

    if (!product) {
      res.statusCode = 404;
      throw new Error("'id' - não encontrado");
    }

    const { id, name, price, description, imageUrl } = req.body;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.statusCode = 400;
        throw new Error("'id' - Deve ser em formato string");
      }
    }
    if (name !== undefined) {
      if (typeof name !== "string") {
        res.statusCode = 400;
        throw new Error("'name' - Deve ser em formato string");
      }
    }
    if (price !== undefined) {
      if (typeof price !== "number") {
        res.statusCode = 400;
        throw new Error("'price' - Deve ser em formato number");
      }
    }
    if (description !== undefined) {
      if (typeof description !== "string") {
        res.statusCode = 400;
        throw new Error("'description' - Deve ser em formato string");
      }
    }
    if (imageUrl !== undefined) {
      if (typeof imageUrl !== "string") {
        res.statusCode = 400;
        throw new Error("'imageUrl' - Deve ser em formato string");
      }
    }

    const produtoAtualizado: TProduct = {
      id: id || product.id,
      name: name || product.name,
      price: price || product.price,
      description: description || product.description,
      image_url: imageUrl || product.imageUrl,
    };

    await db.update(produtoAtualizado).from("products").where({ id: idToEdit });
    res.status(200).send("Produto atualizado com sucesso");
  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }
    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Erro inesperado");
    }
  }
}); // ✅ QUERY BUILDER OK

app.delete("/products/:id", async (req: Request, res: Response) => {
  //DELETAR PRODUTOS
  try {
    const idToDelete: string = req.params.id;

    const [deletProduct]: Array<TProduct> = await db
      .select("*")
      .from("products")
      .where({ id: idToDelete });

    if (!deletProduct) {
      res.statusCode = 404;
      throw new Error("'id' - Não encontrado");
    }

    await db.delete().from("products").where({ id: idToDelete });
    res.status(200).send("Produto deletado com sucesso");
  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }
    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Erro inesperado");
    }
  }
}); // ✅ QUERY BUILDER OK


//************************************************************** */
//PURCHASES

app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const listar: Array<TPurchase> = await db.select("*").from("purchases");
    res.status(200).send(listar);
  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }
    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Erro inesperado");
    }
  }
}); // ✅ QUERY BUILDER OK

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToSearch: string = req.params.id;
    const [purchase] = await db
      .select(
        "purchases.id AS purchaseId",
        "purchases.buyer AS buyerId",
        "users.name AS buyerName",
        "users.email AS buyerEmail",
        "purchases.total_price AS totalPrice",
        "purchases.created_at AS createdAt"
      )
      .from("purchases")
      .join("users", "purchases.buyer", "=", "users.id")
      .where({ "purchases.id": idToSearch });

    const listarPurchasesProducts = await db
      .select("*")
      .from("purchases_products")
      .join("products", "purchases_products.product_id", "=", "products.id");

    const list = {
      purchaseId: purchase.purchaseId,
      buyerId: purchase.buyerId,
      buyerName: purchase.buyerName,
      buyerEmail: purchase.buyerEmail,
      totalPrice: purchase.totalPrice,
      createdAt: purchase.createdAt,
      products: listarPurchasesProducts,
    };

    res.status(200).send(list);
  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }
    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Erro inesperado");
    }
  }
}); // ✅ QUERY BUILDER OK

app.post("/purchases", async (req: Request, res: Response) => {
  try{
    const { id, buyer, products } = req.body;

    if(!id || !buyer ){
      res.statusCode = 400;
      throw new Error("'id' - 'buyer' - 'total_price' são obrigatorios, não podem ser omitidos");
    }
    if(typeof id !== "string"){
      res.statusCode = 400;
      throw new Error("'id' - deve ser enviado no formato string");
    }
    if(typeof buyer !== "string"){
      res.statusCode = 400;
      throw new Error("'buyer' - deve ser enviado no formato string");
    }
    if(!products){
      res.statusCode = 400;
      throw new Error("'products', não pode ser omitido");
    }
    if(!Array.isArray(products)){
      res.statusCode = 400;
      throw new Error("'products', deve ser enviado no formato de array products: [ ],");
    }

    const [idCompra] = await db.select("*").from("purchases").where({id: id})

    if(idCompra){
      res.statusCode = 400;
      throw new Error("'id' - ja existe, favor conferir os dados");
    }

    const idProducts = products.map(async (item) => {
      return await db.select("*").from("products").where({id: item.id});
    });
    const prod = await Promise.all(idProducts);   

    const flatProducts = prod.flat(); //estabiliza em um unico array de objetos

    const totalPrice = flatProducts.reduce((acc, atual)=> acc + atual.price, 0);

    const insertData = flatProducts.map((prd: TProduct)=>({
      purchases_id: id,
      product_id: prd.id,
      quantity: products.find((item) => item.id === prd.id)?.quantity || 1
    }));

    await db.insert({
      id,
      buyer,
      total_price: totalPrice
    }).from("purchases");    

    await db.transaction(async (tr) => {
      for (const item of insertData) {
        await tr.insert({
          purchase_id: item.purchases_id,
          product_id: item.product_id,
          quantity: item.quantity
        }).into("purchases_products");
      }
    });

    res.status(200).send("Pedido realizado com sucesso");
  }catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }
    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Erro inesperado");
    }
  }
}); // ✅ QUERY BUILDER OK

app.delete("/purchases/:id", async (req: Request, res: Response) =>{
  try{
    const idToDelete:string = req.params.id;
    if(!idToDelete){
      res.statusCode = 404;
      throw new Error("'id' - não pode ser omitido");
    }

    const [compra] = await db.select("*").from("purchases").where({id: idToDelete});

    if(!compra){
      res.statusCode = 404;
      throw new Error("'id' - compra não existente, verificar 'id'");
    }

    await db.delete().from("purchases").where({id: idToDelete});

    res.status(200).send("Pedido cancelado com sucesso");
  }catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }
    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Erro inesperado");
    }
  }
}); // ✅ QUERY BUILDER OK
//************************************************************** */
//Execução dos scripts

app.listen(port, () => {
  console.log("Servidor rodando na porta 3003");
}); //✅ QUERY BUILDER OK