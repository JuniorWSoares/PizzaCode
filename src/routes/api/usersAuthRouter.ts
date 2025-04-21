// Importa o framework Express para criar rotas e lidar com requisições HTTP.
import express from "express";
// Importa o controlador responsável pelas operações relacionadas à autenticação de usuários.
import { UsersAuthController } from "../../controllers/api/usersAuthController";

// Cria um roteador do Express para definir as rotas de autenticação de usuários.
const router = express.Router()

// Instancia o controlador de autenticação de usuários.
const usersAuthController = new UsersAuthController()

// Define a rota para registrar um novo usuário.
router.post("/register", usersAuthController.register)

// Define a rota para realizar o login de um usuário.
router.post("/login", usersAuthController.login)

// Define a rota para realizar o logout de um usuário.
router.post("/logout", usersAuthController.logout)

// Exporta o roteador para ser utilizado em outras partes da aplicação.
export = router