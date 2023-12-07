import express, { Request, Response } from "express";
import cors from "cors";
import {
  createProducts,
  createUser,
  products,
  searchProducts,
  users,
} from "./database";
import { TProduct, TUser } from "./types";

const app = express();
app.use(express.json());
app.use(cors());

const port = 3003;

app.listen(port, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

//USERS ENDPOINTS
app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

app.post("/users", (req: Request, res: Response) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  res.status(201).send(createUser(id, name, email, password));
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const idToDelete: string = req.params.id;

  const index = users.findIndex((usuario) => usuario.id === idToDelete);

  if (index >= 0) {
    users.splice(index, 1);
    return res.status(200).send("Usuario deletado com sucesso");
  }
  res.status(404).send("usuario não encontrado");
});

app.put("/users/:id", (req: Request, res: Response) => {
  const idToEdit = req.params.id; // id do usuario

  const newId = req.body.id as string | undefined;
  const newName = req.body.name as string | undefined;
  const newEmail = req.body.email as string | undefined;
  const newPassword = req.body.password as string | undefined;

  const newUser: TUser | undefined = users.find(
    (usuario) => usuario.id === idToEdit
  );

  if (newUser) {
    newUser.id = newId || newUser.id;
    newUser.name = newName || newUser.name;
    newUser.email = newEmail || newUser.email;
    newUser.password = newPassword || newUser.password;

    return res.status(201).send("Informações atualizadas com sucesso!");
  }

  res.status(404).send("Usuario não localizado");
});

//************************************************************** */
//PRODUCTS ENDPOINTS
app.get("/products", (req: Request, res: Response) => {
  //VER TODOS OS PRODUTOS
  const name = req.query.name as string;
  if (name) {
    return res.status(200).send(searchProducts(name));
  }
  res.status(200).send(products);
});

app.post("/products", (req: Request, res: Response) => {
  //CADASTRO DE NOVOS PRODUTOS
  const id = req.body.id as string;
  const name = req.body.name as string;
  const price = req.body.price as number;
  const description = req.body.description as string;
  const imageUrl = req.body.imageUrl as string;
  res.status(201).send(createProducts(id, name, price, description, imageUrl));
});

app.delete("/products/:id", (req: Request, res: Response) => {
  //DELETAR PRODUTOS
  const idToDelete: string = req.params.id;

  const index: number = products.findIndex(
    (usuario) => usuario.id === idToDelete
  );

  if (index >= 0) {
    products.splice(index, 1);
    return res.status(200).send("Produto deletado com sucesso");
  }
  res.status(404).send("Produto não encontrado");
});

app.put("/products/:id", (req: Request, res: Response) => {
  //EDIÇÃO DE PRODUTOS
  const idToEdit = req.params.id; // id do produto

  const newId = req.body.id as string | undefined;
  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newDescription = req.body.description as string | undefined;
  const newImageUrl = req.body.imageUrl as string | undefined;

  const novoProduto: TProduct | undefined = products.find(
    (usuario) => usuario.id === idToEdit
  );

  if (novoProduto) {
    novoProduto.id = newId || novoProduto.id;
    novoProduto.name = newName || novoProduto.name;
    novoProduto.description = newDescription || novoProduto.description;
    novoProduto.price = newPrice || novoProduto.price;
    novoProduto.imageUrl = newImageUrl || novoProduto.imageUrl;
    return res.status(200).send("Informações atualizadas com sucesso!");
  }
  res.status(404).send("Produto não localizado");
});

//************************************************************** */
