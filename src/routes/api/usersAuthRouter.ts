import express from "express"
import { UsersAuthController } from "../../controllers/api/usersAuthController"

const router = express.Router()

const usersAuthController = new UsersAuthController()

router.post("/register", usersAuthController.register)

export = router