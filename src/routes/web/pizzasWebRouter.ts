import express from "express"
import { PizzasWebController } from "../../controllers/web/pizzasWebController"
const router = express.Router()

const pizzasWebController = new PizzasWebController()

router.get("/", pizzasWebController.index)

export = router