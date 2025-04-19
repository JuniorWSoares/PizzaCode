import express from "express"
import { PizzasWebController } from "../../controllers/web/pizzasWebController"
import { authMiddleware } from "../../middlewares/auth-middleware"
const router = express.Router()

const pizzasWebController = new PizzasWebController()

router.get("/", authMiddleware, pizzasWebController.index)
router.get("/admin", authMiddleware, pizzasWebController.admin)

export = router