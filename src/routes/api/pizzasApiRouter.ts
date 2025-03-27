import express from "express"
import { PizzasApiController } from "../../controllers/api/pizzasApiController"
import { upload } from "../../middlewares/upload-middleware"
const router = express.Router()

const pizzasApiController = new PizzasApiController()

router.get("/", pizzasApiController.index)
router.post("/create", upload.single('image'), pizzasApiController.create)
router.post("/delete/:id", pizzasApiController.delete)

export = router