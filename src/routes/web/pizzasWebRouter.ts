import express from "express";
import { PizzasWebController } from "../../controllers/web/pizzasWebController";
import { authMiddleware, ensureUserIsAdmin } from "../../middlewares/auth-middleware";

const router = express.Router();

const pizzasWebController = new PizzasWebController();

// Rota para a página inicial de pizzas, protegida por autenticação.
router.get("/", authMiddleware, pizzasWebController.index);

// Rota para a página de administração de pizzas, protegida por autenticação e verificação de administrador.
router.get("/admin", authMiddleware, ensureUserIsAdmin, pizzasWebController.admin);

export = router;