# Labecommerce - Backend

Este é o backend para o LabEcommerce, uma aplicação de comércio eletrônico.

## Descrição

O LabEcommerce (**_Back End_**) é uma plataforma de comércio eletrônico onde os usuários podem gerenciar produtos e realizar compras. Este backend fornece endpoints para realizar operações CRUD (Create, Read, Update, Delete) em usuários e produtos.

## Documentação:
- **Postman**
- **_https://documenter.getpostman.com/view/29849540/2s9YkjAibP#f03b7a3b-ff9d-49bb-aa52-4ac1e1ce7738_**

## Endpoints

## Usuários

#### Listar Todos os Usuários

- **Endpoint:** `/users`
- **Método:** GET
- **Descrição:** Retorna a lista de todos os usuários cadastrados.

#### Criar Novo Usuário

- **Endpoint:** `/users`
- **Método:** POST
- **Descrição:** Cria um novo usuário com base nos dados fornecidos.

#### Atualizar Usuário

- **Endpoint:** `/users/:id`
- **Método:** PUT
- **Descrição:** Atualiza as informações do usuário correspondente ao ID fornecido.

#### Remover Usuário

- **Endpoint:** `/users/:id`
- **Método:** DELETE
- **Descrição:** Remove o usuário correspondente ao ID fornecido.


## Produtos

#### Listar Todos os Produtos

- **Endpoint:** `/products`
- **Método:** GET
- **Descrição:** Retorna a lista de todos os produtos cadastrados.

#### Criar Novo Produto

- **Endpoint:** `/products`
- **Método:** POST
- **Descrição:** Cria um novo produto com base nos dados fornecidos.

#### Atualizar Produto

- **Endpoint:** `/products/:id`
- **Método:** PUT
- **Descrição:** Atualiza as informações do produto correspondente ao ID fornecido.

#### Remover Produto

- **Endpoint:** `/products/:id`
- **Método:** DELETE
- **Descrição:** Remove o produto correspondente ao ID fornecido.

## Configuração

Para executar este projeto localmente, siga as etapas:

1. Clone este repositório.
2. Instale as dependências usando `npm install`.
3. Configure as variáveis de ambiente, se necessário.
4. Execute o servidor usando `npm start`.
5. Após isso entre no **_Postman_** ou **_Insomnia_** acessando a BASE_URL: http://localhost:3003

Certifique-se de ter um ambiente Node.js configurado para que voce consiga rodar corretamente o projeto em sua maquina.

## Tecnologias Utilizadas

- Node.js
- Typescript
- Express.js

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Autor

[David_Brito] / davidbrito.carneiro458@gmail.com

