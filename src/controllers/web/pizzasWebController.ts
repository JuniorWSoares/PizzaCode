import { Handler } from "express";
import { prisma } from "../../database";
export class PizzasWebController {
    index: Handler = async (req, res, next) => {
        try {
            const pizzas = await prisma.pizza.findMany({include: {PizzaSizes: true}})

            const user = { role: "Customer" }

            res.render("index", { pizzas, user })
        } catch (error) {
            next(error)
        }
    }

    admin: Handler = async (req, res, next) => {
        try {
            const pizzas = await prisma.pizza.findMany({include: {PizzaSizes: true}})

            const user = { role: "Admin" }

            res.render("admin", { pizzas, user })
        } catch (error) {
            next(error)
        }
    }
}