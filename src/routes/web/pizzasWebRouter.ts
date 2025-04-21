// Importa o framework Express para criar rotas e lidar com requisições HTTP.
import express from "express";
// Importa o controlador responsável pelas operações relacionadas às páginas web de pizzas.
import { PizzasWebController } from "../../controllers/web/pizzasWebController";
// Importa o middleware de autenticação para proteger as rotas.
import { authMiddleware } from "../../middlewares/auth-middleware";

// Cria um roteador do Express para definir as rotas relacionadas às páginas web de pizzas.
const router = express.Router()

// Instancia o controlador das páginas web de pizzas.
const pizzasWebController = new PizzasWebController()

// Define a rota para exibir a página inicial de pizzas, protegida pelo middleware de autenticação.
router.get("/", authMiddleware, pizzasWebController.index)

// Define a rota para exibir a página de administração de pizzas, também protegida pelo middleware de autenticação.
router.get("/admin", authMiddleware, pizzasWebController.admin)

// Exporta o roteador para ser utilizado em outras partes da aplicação.
export = router