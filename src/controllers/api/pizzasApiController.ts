import { Handler } from "express";
import { prisma } from "../../database";
import { AddPizzaSizeRequestSchema, CreatePizzaRequestSchema, UpdatePizzaSizeRequestSchema} from "./schemas/pizzasRequestSchema";

export class PizzasApiController {
    index: Handler = async (req, res, next) => {
        try {
            const pizzas = await prisma.pizza.findMany({
                orderBy: {title: "asc"},
                include: {PizzaSizes: true}
            })

            res.json({pizzas})
        } catch (error) {
            next(error)
        }
    }
    
    create: Handler = async (req, res, next) => {
        try {
            const {description, title} = CreatePizzaRequestSchema.parse(req.body)
            const imageUrl = `/uploads/${req.file?.filename}`
            const data = {description, title, url: imageUrl}

            await prisma.pizza.create({data})

            res.redirect("/#menu")
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const {description, title} = CreatePizzaRequestSchema.parse(req.body)
            const imageUrl = `/uploads/${req.file?.filename}`
            const data = {description, title, url: imageUrl}

            await prisma.pizza.update({ where: {id: Number(req.params.id)}, data })

            res.redirect("/#menu")
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            await prisma.pizza.delete({where: {id: Number(req.params.id)}})
            res.redirect("/#menu")
        } catch (error) {
            next(error)
        }
    }

    addSize: Handler = async (req, res, next) => {
        try {
            const body = AddPizzaSizeRequestSchema.parse(req.body)
            await prisma.pizzaSize.create({data: body})

            res.redirect("/#menu")
        } catch (error) {
            next(error)
        }
    }

    updateSize: Handler = async (req, res, next) => {
        try {
            const body = UpdatePizzaSizeRequestSchema.parse(req.body)
            await prisma.pizzaSize.update({data: body, where: {id: Number(req.params.id)}})

            res.redirect("/#menu")
        } catch (error) {
            next(error)
        }
    }

    deleteSize: Handler = async (req, res, next) => {
        try {
            await prisma.pizzaSize.delete({where: {id: Number(req.params.id)}})
            res.redirect("/#menu")
        } catch (error) {
            next(error)
        }
    }
}