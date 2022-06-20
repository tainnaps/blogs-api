# Blogs API 👩‍💻

Projeto de uma API de um site de blog, utilizando um banco de dados SQL, desenvolvido durante o curso de Desenvolvimento Web Full Stack da [Trybe](https://www.betrybe.com/).

A API foi construída utilizando os princípios REST e seguindo a arquitetura MSC (Model, Service, Controller).

Suas principais funcionalidades são:
- Busca, cadastro, login, autenticação e remoção de pessoas usuárias
- Busca e cadastro de categorias de posts do blog
- Busca, cadastro, atualização e remoção de posts do blog

## Tecnologias
As tecnologias utilizadas para o desenvolvimento da aplicação foram:
- Node.js
- MySQL
- Express
- Json Web Token
- Sequelize
- Docker
- Joi

## Executando o projeto
Para executar o projeto, é necessário:

1. Clonar este repositório
  ```
  git clone https://github.com/tainnaps/blogs-api.git
  ```
2. Instalar as dependências na branch `main`
  ```
  npm install
  ```
3. Subir a orquestração de containers
  ```
  docker-compose up -d
  ```
