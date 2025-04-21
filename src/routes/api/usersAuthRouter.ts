import express from "express"
import { UsersAuthController } from "../../controllers/api/usersAuthController"

const router = express.Router()

const usersAuthController = new UsersAuthController()

router.post("/register", usersAuthController.register)
router.post("/login", usersAuthController.login)
router.post("/logout", usersAuthController.logout)

export = router