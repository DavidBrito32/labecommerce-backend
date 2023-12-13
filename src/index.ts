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

//USERS ENDPOINTS
app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }
    res.send(err instanceof Error);
  }
}); // ✅

app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(id === undefined || name === undefined || email === undefined || password === undefined){
        res.statusCode = 400;
        throw new Error("O body deve corresponder com todos esses atributos: 'id' - 'name' - 'email' - 'password'");
    }    
    //verificando o ID
    if(id !== undefined){
      if (typeof id !== "string") {
        res.statusCode = 400;
        throw new Error("'id' - Deve ser um string");
      }
      if (id[0] !== "u") {
        res.status(400);
        throw new Error("O 'id' - deve começar com a letra 'u'");
      }
      const verifyId: TUser | undefined = users.find((user) => user.id === id);
      if (verifyId) {
        res.status(400);
        throw new Error("Ja existe um usuario cadastrado com esse 'ID'");
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

    const verifyEmail: TUser | undefined = users.find(
      (user) => user.email === email
    );

    if (verifyEmail !== undefined) {
      res.status(400);
      throw new Error(
        "'email' - email ja foi cadastrado - utilize outro"
      );
    }

    if(typeof password !== "string"){
      res.statusCode = 400;
      throw new Error("'password' - Deve ser do Tipo string");
    }


    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)
    ) {
      res.statusCode = 400;
      throw new Error(
        "'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial"
      );
    }

   
    createUser(id, name, email, password);
    res.status(201).send("Usuario Cadastrado com sucesso!");

  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }
    if (err instanceof Error) {
      res.send(err.message)
    }else{
      res.send("Erro inesperado")
    }
  }
}); // ✅

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const idToDelete: string = req.params.id;
    const index = users.findIndex((usuario) => usuario.id === idToDelete);

    if (index < 0) {
      res.statusCode = 404;
      throw new Error("Usuario não encontrado");
    }

    if (index >= 0) {
      users.splice(index, 1);
    }
    res.status(200).send("Usuario deletado com sucesso");
  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }

    if (err instanceof Error) {
      res.send(err.message);
    }else{
      res.send("Erro inesperado")
    }
  }
}); // ✅

app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id; // id do usuario

    if (!idToEdit) {
      res.statusCode = 400;
      throw new Error("'id' - paramiters - é obrigatorio para esta operação");
    }

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
  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }

    if (err instanceof Error) {
      res.send(err.message);
    }
  }
});

//************************************************************** */
//PRODUCTS ENDPOINTS
app.get("/products", (req: Request, res: Response) => {
  //VER TODOS OS PRODUTOS
  try {
    const name = req.query.name as string;

    if (name !== undefined) {
      if(name.length < 1){
        res.statusCode = 400;
        throw new Error("'name' - query params deve possuir pelo menos um caractere");
      }
      res.status(200).send(searchProducts(name));
    }

    res.status(200).send(products);

  } catch (err) {
    if (req.statusCode === 200) {
      req.statusCode = 500;
    }

    if (err instanceof Error) {
      res.send(err.message);
    }else{
      res.send("Erro inesperado")
    }
  }
});

app.post("/products", (req: Request, res: Response) => {
  //CADASTRO DE NOVOS PRODUTOS
  try {
    const { id, name, price, description, imageUrl } = req.body;

    if(id === undefined || name === undefined || price === undefined || description === undefined || imageUrl === undefined){
      res.statusCode = 400;
      throw new Error("O body deve corresponder com todos esses atributos: 'id' - 'name' - 'price' - 'description' - 'imageUrl'");
    }

    if(id !== undefined){
      if (typeof id !== "string") {
        res.statusCode = 400;
        throw new Error("'id' - Precisa ser uma string");
      }
  
      if (!id.includes("prod")) {
        res.statusCode = 400;
        throw new Error("'id' - Precisa corresponder ao padrão: 'prod000'");
      }

      const duplicatedProduct: TProduct | undefined = products.find(
        (prod) => prod.id === id
      );
  
      if (duplicatedProduct !== undefined) {
        res.statusCode = 400;
        throw new Error("'id' - ja existe um produto cadastrado com esse id");
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

    if(typeof price !== "number"){
      res.statusCode = 400;
      throw new Error("'price' - Deve ser enviado como um number");
    }

    if(typeof description !== "string"){
      res.statusCode = 400;
      throw new Error("'description' - Deve ser uma string");
    }

    if(typeof imageUrl !== "string"){
      res.statusCode = 400;
      throw new Error("'imageUrl' - Deve ser uma string");
    }

    createProducts(id, name, price, description, imageUrl);
    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (err) {
    if (req.statusCode === 200) {
      req.statusCode = 500;
    }

    if (err instanceof Error) {
      res.send(err.message);
    }else{
      res.send("Erro inesperado");
    }
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  //DELETAR PRODUTOS
  try {
    const idToDelete: string = req.params.id;
    const index: number = products.findIndex(
      (produto) => produto.id === idToDelete
    );

    if (index < 0) {
      res.statusCode = 404;
      throw new Error("Produto não encontrado no sistema");
    }

    if (index >= 0) {
      products.splice(index, 1);
      return res.status(200).send("Produto deletado com sucesso");
    }
  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }

    if (err instanceof Error) {
      res.send(err.message);
    }
    else{
      res.send("Erro inesperado")
    }
  }
});

app.put("/products/:id", (req: Request, res: Response) => {
  //EDIÇÃO DE PRODUTOS
  try {
    const idToEdit = req.params.id; // id do produto
    const buscar = products.find(prod => prod.id === idToEdit);

    if(buscar === undefined){
      res.statusCode = 404;
      throw new Error("Produto não encontrado");
    }
    const { id, name, price, description, imageUrl } = req.body;

    if(id !== undefined){
      if(typeof id !== "string"){
        res.statusCode = 400;
        throw new Error("'id' - Deve ser em formato string");
      }
    }
    if(name !== undefined){
      if(typeof name !== "string"){
        res.statusCode = 400;
        throw new Error("'name' - Deve ser em formato string");
      }
    }
    if(price !== undefined){
      if(typeof price !== "number"){
        res.statusCode = 400;
        throw new Error("'price' - Deve ser em formato number");
      }
    }
    if(description !== undefined){
      if(typeof description !== "string"){
        res.statusCode = 400;
        throw new Error("'description' - Deve ser em formato string");
      }
    }
    if(imageUrl !== undefined){
      if(typeof imageUrl !== "string"){
        res.statusCode = 400;
        throw new Error("'imageUrl' - Deve ser em formato string");
      }
    }    

    const novoProduto: TProduct | undefined = products.find(
      (usuario) => usuario.id === idToEdit
    );
    if (novoProduto) {
      novoProduto.id = id || novoProduto.id;
      novoProduto.name = name || novoProduto.name;
      novoProduto.description = description || novoProduto.description;
      novoProduto.price = price || novoProduto.price;
      novoProduto.imageUrl = imageUrl || novoProduto.imageUrl;
      return res.status(200).send("Informações atualizadas com sucesso!");
    }

  } catch (err) {
    if (res.statusCode === 200) {
      res.statusCode = 500;
    }

    if (err instanceof Error) {
      res.send(err.message);
    }else{
      res.send("Erro inesperado");
    }
  }
});

//************************************************************** */
