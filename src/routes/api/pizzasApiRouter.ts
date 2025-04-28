import express from "express";
import { PizzasApiController } from "../../controllers/api/pizzasApiController";
import { upload } from "../../middlewares/upload-middleware";
import { deleteImageMiddleware, updateImageMiddleware } from "../../middlewares/delete-image-middlewares";
import { authMiddleware } from "../../middlewares/auth-middleware";

const router = express.Router()

const pizzasApiController = new PizzasApiController()

// Rota para criar um novo tipo de pizza, com upload de imagem
router.post("/create", upload.single('image'), pizzasApiController.create)

// Rota para deletar um tipo de pizza, com deleção da imagem associada
router.post("/delete/:id", deleteImageMiddleware, pizzasApiController.delete)

// Rota para atualizar um tipo de pizza, com upload de imagem e remoção da imagem antiga
router.post("/update/:id", upload.single('image'), updateImageMiddleware, pizzasApiController.update)

// Rota para adicionar um novo tamanho a uma pizza, sem upload de imagem
router.post("/add-size", authMiddleware, pizzasApiController.addSize)

// Rota para atualizar o tamanho de uma pizza específica, sem upload de imagem
router.post("/update-size/:id", pizzasApiController.updateSize)

// Rota para deletar um tamanho específico de uma pizza
router.post("/delete-size/:id", pizzasApiController.deleteSize)

export = router