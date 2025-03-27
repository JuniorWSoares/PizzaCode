import exspress from "express"
import { PizzasWebController } from "../../controllers/web/pizzasWebController"
const router = exspress.Router()

const pizzasWebController = new PizzasWebController()

router.get("/", pizzasWebController.index)

export = router