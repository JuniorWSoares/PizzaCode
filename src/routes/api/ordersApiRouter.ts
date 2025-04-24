import express from "express"
import { OrdersApiController } from "../../controllers/api/ordersApiController"
import { authMiddleware } from "../../middlewares/auth-middleware"
const router = express.Router()

const ordersApiController = new OrdersApiController()

router.get("/", ordersApiController.index) // Listar todos os pedidos
router.post("/", authMiddleware, ordersApiController.addingToOrder) // Adiciona um novo pedido ao carrinho
router.get("/:id", ordersApiController.show) // Exibir detalhes de um pedido específico
router.put("/:id", ordersApiController.update) // Atualizar um pedido existente
router.delete("/:id", ordersApiController.delete) // Excluir um pedido

export = router