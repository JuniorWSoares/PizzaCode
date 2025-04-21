// Importa o Express para criar rotas.
import express from "express";
// Importa o controlador das páginas web de pizzas.
import { PizzasWebController } from "../../controllers/web/pizzasWebController";
// Importa os middlewares de autenticação.
import { authMiddleware, ensureUserIsAdmin } from "../../middlewares/auth-middleware";

// Cria o roteador para as rotas de páginas web de pizzas.
const router = express.Router();
// Instancia o controlador de pizzas.
const pizzasWebController = new PizzasWebController();

// Rota para a página inicial de pizzas, protegida por autenticação.
router.get("/", authMiddleware, pizzasWebController.index);

// Rota para a página de administração de pizzas, protegida por autenticação e verificação de administrador.
router.get("/admin", authMiddleware, ensureUserIsAdmin, pizzasWebController.admin);

// Exporta o roteador.
export = router;