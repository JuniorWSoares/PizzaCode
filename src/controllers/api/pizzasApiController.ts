// Importa o tipo "Handler" do Express, o cliente Prisma para interagir com o banco de dados,
// e os esquemas de validação para as requisições relacionadas a pizzas.
import { Handler } from "express";
import { prisma } from "../../database";
import { AddPizzaSizeRequestSchema, CreatePizzaRequestSchema, UpdatePizzaSizeRequestSchema } from "./schemas/pizzasRequestSchema";

// Define a classe PizzasApiController, que contém os métodos para manipular as requisições relacionadas a pizzas.
export class PizzasApiController {
    // Método "create": Responsável por criar uma nova pizza.
    // Valida os dados da requisição usando o esquema "CreatePizzaRequestSchema".
    create: Handler = async (req, res, next) => {
        try {
            const { description, title } = CreatePizzaRequestSchema.parse(req.body)
            const imageUrl = `/uploads/${req.file?.filename}` // Define a URL da imagem com base no arquivo enviado.
            const data = { description, title, url: imageUrl }

            // Cria a nova pizza no banco de dados.
            await prisma.pizza.create({ data })

            // Redireciona para a página do menu.
            res.redirect("/admin#menu")
        } catch (error) {
            next(error)
        }
    }

    // Método "update": Responsável por atualizar uma pizza existente.
    // Valida os dados da requisição e atualiza a pizza no banco de dados.
    update: Handler = async (req, res, next) => {
        try {
            const { description, title } = CreatePizzaRequestSchema.parse(req.body)
            const imageUrl = `/uploads/${req.file?.filename}`
            const data = { description, title, url: imageUrl }

            // Atualiza a pizza com base no ID fornecido nos parâmetros da URL.
            await prisma.pizza.update({ where: { id: Number(req.params.id) }, data })

            res.redirect("/admin#menu")
        } catch (error) {
            next(error)
        }
    }

    // Método "delete": Responsável por excluir uma pizza.
    delete: Handler = async (req, res, next) => {
        try {
            // Exclui a pizza com base no ID fornecido nos parâmetros da URL.
            await prisma.pizza.delete({ where: { id: Number(req.params.id) } })

            res.redirect("/admin#menu")
        } catch (error) {
            next(error)
        }
    }

    // Método "addSize": Responsável por adicionar um novo tamanho a uma pizza.
    // Valida os dados da requisição usando o esquema "AddPizzaSizeRequestSchema".
    addSize: Handler = async (req, res, next) => {
        try {
            const body = AddPizzaSizeRequestSchema.parse(req.body)

            // Cria um novo tamanho de pizza no banco de dados.
            await prisma.pizzaSize.create({ data: body })

            res.redirect("/admin#menu")
        } catch (error) {
            next(error)
        }
    }

    // Método "updateSize": Responsável por atualizar um tamanho de pizza existente.
    // Valida os dados da requisição usando o esquema "UpdatePizzaSizeRequestSchema".
    updateSize: Handler = async (req, res, next) => {
        try {
            const body = UpdatePizzaSizeRequestSchema.parse(req.body)

            // Atualiza o tamanho da pizza com base no ID fornecido nos parâmetros da URL.
            await prisma.pizzaSize.update({ data: body, where: { id: Number(req.params.id) } })

            res.redirect("/admin#menu")
        } catch (error) {
            next(error)
        }
    }

    // Método "deleteSize": Responsável por excluir um tamanho de pizza.
    deleteSize: Handler = async (req, res, next) => {
        try {
            // Exclui o tamanho da pizza com base no ID fornecido nos parâmetros da URL.
            await prisma.pizzaSize.delete({ where: { id: Number(req.params.id) } })

            res.redirect("/admin#menu")
        } catch (error) {
            next(error)
        }
    }
}