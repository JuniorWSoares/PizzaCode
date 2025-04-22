import express from "express";
import { UsersAuthController } from "../../controllers/api/usersAuthController";

const router = express.Router()

// Instancia o controlador de autenticação de usuários.
const usersAuthController = new UsersAuthController()

// Define a rota para registrar um novo usuário.
router.post("/register", usersAuthController.register)

// Define a rota para realizar o login de um usuário.
router.post("/login", usersAuthController.login)

// Define a rota para realizar o logout de um usuário.
router.post("/logout", usersAuthController.logout)

export = router