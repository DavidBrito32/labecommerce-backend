import express, { Request, Response } from "express";
import cors from "cors";
import {
  createProducts,
  createUser,
  products,
  searchProducts,
  users,
} from "./database";

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

//************************************************************** */
//PRODUCTS ENDPOINTS
app.get("/products", (req: Request, res: Response) => {
  const name = req.query.name as string;
  if (name) {
    return res.status(200).send(searchProducts(name));  }
  res.status(200).send(products);
});

app.post("/products", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const price = req.body.price as number;
  const description = req.body.description as string;
  const imageUrl = req.body.imageUrl as string;
  res.status(201).send(createProducts(id, name, price, description, imageUrl));
});

//************************************************************** */