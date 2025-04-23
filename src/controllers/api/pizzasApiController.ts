// Importa o tipo "Handler" do Express, o cliente Prisma para interagir com o banco de dados,
// e os esquemas de validação para as requisições relacionadas a pizzas.
import { Handler } from "express";
import { prisma } from "../../database";
import { AddPizzaRequestSchema, CreatePizzaTypeRequestSchema, UpdatePizzaRequestSchema } from "./schemas/pizzasRequestSchema";
import { HttpError } from "../../errors/HttpError";

// Define a classe PizzasApiController, que contém os métodos para manipular as requisições relacionadas a pizzas.
export class PizzasApiController {
    // Método "create": Responsável por criar um novo tipo de pizza.
    // Valida os dados da requisição usando o esquema "CreatePizzaTypeRequestSchema".
    create: Handler = async (req, res, next) => {
        try {
            const { description, title } = CreatePizzaTypeRequestSchema.parse(req.body)
            const imageUrl = `/uploads/${req.file?.filename}` // Define a URL da imagem com base no arquivo enviado.
            const data = { description, title, url: imageUrl }

            // Cria um novo tipo de pizza no banco de dados.
            await prisma.pizzaType.create({ data })

            // Redireciona para a página do menu.
            res.redirect("/admin#menu")
        } catch (error) {
            next(error)
        }
    }

    // Método "update": Responsável por atualizar um tipo de pizza existente.
    // Valida os dados da requisição e atualiza o tipo de pizza no banco de dados.
    update: Handler = async (req, res, next) => {
        try {
            const { description, title } = CreatePizzaTypeRequestSchema.parse(req.body)
            const imageUrl = `/uploads/${req.file?.filename}`
            const data = { description, title, url: imageUrl }

            // Atualiza o tipo de pizza com base no ID fornecido nos parâmetros da URL.
            await prisma.pizzaType.update({ where: { id: Number(req.params.id) }, data })

            res.redirect("/admin#menu")
        } catch (error) {
            next(error)
        }
    }

    // Método "delete": Responsável por excluir um tipo de pizza.
    delete: Handler = async (req, res, next) => {
        try {
            // Exclui o tipo de pizza com base no ID fornecido nos parâmetros da URL.
            await prisma.pizzaType.delete({ where: { id: Number(req.params.id) } })

            res.redirect("/admin#menu")
        } catch (error) {
            next(error)
        }
    }

    // Método "addSize": Responsável por adicionar um novo tamanho a uma pizza.
    // Valida os dados da requisição usando o esquema "AddPizzaRequestSchema".
    addSize: Handler = async (req, res, next) => {
        try {
            const body = AddPizzaRequestSchema.parse(req.body)

            // Verifica se o ID do tipo de pizza existe no banco de dados.
            const pizzaTypeExists = await prisma.pizzaType.findUnique({ where: { id: Number(body.pizzaTypeId) } })
            if (!pizzaTypeExists) {
                throw new HttpError(404, "Pizza não encontrada!")
            }

            // Cria um novo tamanho de pizza no banco de dados.
            const newSize = await prisma.pizza.create({ data: body })

            res.status(201).json({newSize})
        } catch (error) {
            next(error)
        }
    }

    // Método "updateSize": Responsável por atualizar um tamanho de pizza existente.
    // Valida os dados da requisição usando o esquema "UpdatePizzaRequestSchema".
    updateSize: Handler = async (req, res, next) => {
        try {
            const body = UpdatePizzaRequestSchema.parse(req.body)

            // Atualiza o tamanho da pizza com base no ID fornecido nos parâmetros da URL.
            await prisma.pizza.update({ data: body, where: { id: Number(req.params.id) } })

            res.redirect("/admin#menu")
        } catch (error) {
            next(error)
        }
    }

    // Método "deleteSize": Responsável por excluir um tamanho de pizza.
    deleteSize: Handler = async (req, res, next) => {
        try {
            // Exclui o tamanho da pizza com base no ID fornecido nos parâmetros da URL.
            await prisma.pizza.delete({ where: { id: Number(req.params.id) } })

            res.redirect("/admin#menu")
        } catch (error) {
            next(error)
        }
    }
}