import { Handler } from "express";
import { prisma } from "../../database";
import { AddPizzaRequestSchema, CreatePizzaTypeRequestSchema, UpdatePizzaRequestSchema } from "./schemas/pizzasRequestSchema";
import { HttpError } from "../../errors/HttpError";

interface PizzaTypeData {
    title: string // Título da pizza
    description: string // Descrição da pizza
    url?: string // URL da imagem da pizza
}

export class PizzasApiController {
    // Método "create": Cria um novo tipo de pizza
    create: Handler = async (req, res, next) => {
        try {
            const { description, title } = CreatePizzaTypeRequestSchema.parse(req.body)
            const data = { description, title, url: `/uploads/${req.file?.filename}` }

            await prisma.pizzaType.create({ data }) // Cria tipo de pizza
            res.redirect("/admin#menu") // Redireciona para o menu
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }

    // Método "update": Atualiza um tipo de pizza existente
    update: Handler = async (req, res, next) => {
        try {
            const { description, title } = CreatePizzaTypeRequestSchema.parse(req.body)
            let data: PizzaTypeData = { description, title }

            // Atualiza a URL da imagem, se necessário
            if (req.file?.filename) {
                data.url = `/uploads/${req.file.filename}`
            } else {
                data.url = res.locals.record.url // Mantém a URL antiga
            }

            await prisma.pizzaType.update({ where: { id: Number(req.params.id) }, data }) // Atualiza tipo de pizza
            res.redirect("/admin#menu") // Redireciona para o menu
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }

    // Método "delete": Exclui um tipo de pizza
    delete: Handler = async (req, res, next) => {
        try {
            await prisma.pizzaType.delete({ where: { id: Number(req.params.id) } }) // Exclui tipo de pizza
            res.redirect("/admin#menu") // Redireciona para o menu
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }

    // Método "addSize": Adiciona um novo tamanho de pizza
    addSize: Handler = async (req, res, next) => {
        try {
            const body = AddPizzaRequestSchema.parse(req.body)

            // Verifica se o tipo de pizza existe
            const pizzaTypeExists = await prisma.pizzaType.findUnique({ where: { id: Number(body.pizzaTypeId) } })
            if (!pizzaTypeExists) {
                throw new HttpError(404, "Pizza não encontrada") // Erro se não encontrar pizza
            }

            const newSize = await prisma.pizza.create({ data: body }) // Cria novo tamanho
            res.status(201).redirect("/admin#menu") // Retorna o novo tamanho criado
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }

    // Método "updateSize": Atualiza o tamanho de uma pizza existente
    updateSize: Handler = async (req, res, next) => {
        try {
            const body = UpdatePizzaRequestSchema.parse(req.body)
            await prisma.pizza.update({ data: body, where: { id: Number(req.params.id) } }) // Atualiza tamanho de pizza
            res.redirect("/admin#menu") // Redireciona para o menu
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }

    // Método "deleteSize": Exclui o tamanho de uma pizza
    deleteSize: Handler = async (req, res, next) => {
        try {
            await prisma.pizza.delete({ where: { id: Number(req.params.id) } }) // Exclui tamanho de pizza
            res.redirect("/admin#menu") // Redireciona para o menu
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }
}