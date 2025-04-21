// Importa o framework Express para criar rotas e lidar com requisições HTTP.
import express from "express";
// Importa o controlador responsável pelas operações relacionadas às pizzas na API.
import { PizzasApiController } from "../../controllers/api/pizzasApiController";
// Importa o middleware de upload de arquivos para lidar com imagens de pizzas.
import { upload } from "../../middlewares/upload-middleware";
// Importa o middleware para deletar imagens associadas a pizzas.
import { deleteImageMiddleware } from "../../middlewares/delete-image-middleware";

// Cria um roteador do Express para definir as rotas da API.
const router = express.Router()

// Instancia o controlador da API de pizzas.
const pizzasApiController = new PizzasApiController()

// Define a rota para listar todas as pizzas.
router.get("/", pizzasApiController.index)

// Define a rota para criar uma nova pizza, utilizando o middleware de upload para salvar a imagem.
router.post("/create", upload.single('image'), pizzasApiController.create)

// Define a rota para adicionar um novo tamanho a uma pizza.
router.post("/addSize", pizzasApiController.addSize)

// Define a rota para deletar uma pizza, utilizando o middleware para deletar a imagem associada.
router.post("/delete/:id", deleteImageMiddleware, pizzasApiController.delete)

// Define a rota para atualizar os dados de uma pizza, incluindo a possibilidade de alterar a imagem.
router.post("/update/:id", upload.single('image'), pizzasApiController.update)

// Define a rota para atualizar o tamanho de uma pizza específica.
router.post("/update-size/:id", pizzasApiController.updateSize)

// Define a rota para deletar um tamanho específico de uma pizza.
router.post("/delete-size/:id", pizzasApiController.deleteSize)

// Exporta o roteador para ser utilizado em outras partes da aplicação.
export = router