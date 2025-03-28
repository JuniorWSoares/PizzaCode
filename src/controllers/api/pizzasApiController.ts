import { Handler } from "express";
import { prisma } from "../../database";
import { CreatePizzaRequestSchema } from "./schemas/pizzasRequestSchema";

export class PizzasApiController {
    index: Handler = async (req, res, next) => {
        try {
            const pizzas = await prisma.pizza.findMany({orderBy: {title: "asc"}})
            const priceSize = await prisma.sizeAndPrice.findMany()
            res.json({pizzas, priceSize})
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
}