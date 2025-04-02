import express from "express"
import { PizzasApiController } from "../../controllers/api/pizzasApiController"
import { upload } from "../../middlewares/upload-middleware"
import { deleteImageMiddleware } from "../../middlewares/delete-image-middleware"
const router = express.Router()

const pizzasApiController = new PizzasApiController()

router.get("/", pizzasApiController.index)
router.post("/create", upload.single('image'), pizzasApiController.create)
router.post("/addSize", pizzasApiController.addSize)
router.post("/delete/:id", deleteImageMiddleware, pizzasApiController.delete)
router.post("/update/:id", upload.single('image'), pizzasApiController.update)
router.post("/update-size/:id", pizzasApiController.updateSize)
router.post("/delete-size/:id", pizzasApiController.deleteSize)

export = router