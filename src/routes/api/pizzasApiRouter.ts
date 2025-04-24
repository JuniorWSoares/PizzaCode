import express from "express";
import { PizzasApiController } from "../../controllers/api/pizzasApiController";
import { upload } from "../../middlewares/upload-middleware";
import { deleteImageMiddleware, updateImageMiddleware } from "../../middlewares/delete-image-middlewares";

const router = express.Router()

const pizzasApiController = new PizzasApiController()

// Define a rota para criar um novo tipo de pizza, utilizando o middleware de upload para salvar a imagem.
router.post("/create", upload.single('image'), pizzasApiController.create)

// Define a rota para deletar um tipo de pizza, utilizando o middleware para deletar a imagem associada.
router.post("/delete/:id", deleteImageMiddleware, pizzasApiController.delete)

// Define a rota para atualizar os dados de um tipo pizza, incluindo a possibilidade de alterar a imagem.
router.post("/update/:id", upload.single('image'), updateImageMiddleware, pizzasApiController.update)

// Define a rota para adicionar um novo tamanho a uma pizza.
router.post("/add-size", pizzasApiController.addSize)

// Define a rota para atualizar o tamanho de uma pizza específica.
router.post("/update-size/:id", pizzasApiController.updateSize)

// Define a rota para deletar um tamanho específico de uma pizza.
router.post("/delete-size/:id", pizzasApiController.deleteSize)

export = router