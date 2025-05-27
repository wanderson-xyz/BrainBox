# 🧠 Produtivix

Produtivix é uma aplicação web para gerenciamento de ideias e tarefas, desenvolvida com Node.js, Express, MongoDB e Docker. Este projeto foi criado como parte do processo seletivo da empresa júnior **CEOS**.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** + **Express** – Backend da aplicação
- **MongoDB Atlas** – Banco de dados em nuvem
- **JWT** – Autenticação de usuários
- **Docker** + **Docker Compose** – Containerização da aplicação
- **dotenv** – Gerenciamento de variáveis de ambiente

---

## 📦 Estrutura do Projeto com Docker

A aplicação foi totalmente dockerizada, permitindo fácil execução em qualquer ambiente com Docker instalado.

### ✅ Requisitos:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Como executar com Docker

### 1. Clone o repositório


git clone https://github.com/seu-usuario/produtivix.git
cd produtivix

### 2. Crie o arquivo .env

MONGODB_URI=mongodb+srv://<seu-usuario>:<sua-senha>@cluster0.mongodb.net/brainbox?retryWrites=true&w=majority
JWT_SECRET=sua_chave_secreta_aqui
Use as credenciais do seu MongoDB Atlas.

### 3. Suba o projeto com Docker Compose:
docker-compose up --build


A aplicação estará disponível em:
👉 http://localhost:3000



## 🛠️ Estrutura dos Arquivos Importantes

Dockerfile
Define o ambiente Node.js dentro do container.

.dockerignore
Evita que arquivos desnecessários (como node_modules) sejam enviados para o container.

docker-compose.yml
Orquestra o serviço da aplicação e injeta as variáveis de ambiente do .env.

🔐 Autenticação
O sistema utiliza JWT para proteger rotas e autenticar usuários. O token é gerado no login e deve ser enviado no header das requisições protegidas.

📚 Funcionalidades
Cadastro e login de usuários

Criação, edição e exclusão de ideias/tarefas

Marcar tarefas como concluídas

Armazenamento persistente com MongoDB Atlas

API REST com autenticação JWT

Interface interativa (pronta para integração com frontend)

🧪 Testando a API
Você pode usar o Postman ou o Insomnia para testar as rotas da API:

POST /api/users/register – Criação de usuário

POST /api/users/login – Login e geração do token

GET /api/ideas – Listagem de ideias (com token)

POST /api/ideas – Criar nova ideia (com token)



📌 Observações
A aplicação pode ser adaptada facilmente para usar um container Mongo local em vez do MongoDB Atlas.

O código está pronto para deploy em serviços como Render, Railway, ou servidores com Docker.

👨‍💻 Autor
Projeto desenvolvido por Wanderson Almeida para o processo seletivo da CEOS – Empresa Júnior.
Contatos: [wandersonsa1110@gmail.com] | @wanderson-xyz


