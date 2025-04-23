import express from "express"
import { OrdersApiController } from "../../controllers/api/ordersApiController"
const router = express.Router()

const ordersApiController = new OrdersApiController()

router.get("/", ordersApiController.index) // Listar todos os pedidos
router.post("/", ordersApiController.create) // Criar um novo pedido
router.get("/:id", ordersApiController.show) // Exibir detalhes de um pedido específico
router.put("/:id", ordersApiController.update) // Atualizar um pedido existente
router.delete("/:id", ordersApiController.delete) // Excluir um pedido

export = router