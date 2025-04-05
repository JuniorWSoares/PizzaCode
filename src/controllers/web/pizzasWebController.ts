import { Pizza, PizzaSize } from "@prisma/client";
import { Handler } from "express";

interface PizzasApiResponse {
    pizzas: Pizza[],
    priceSize: PizzaSize[]
}

export class PizzasWebController {
    index: Handler = async (req, res, next) => {
        try {
            const response = await fetch("http://localhost:3000/api/pizzas")
            const dados:PizzasApiResponse = await response.json()
            const pizzas:Pizza[] = dados.pizzas
            const priceSize:PizzaSize[] = dados.priceSize

            const user = {role: "Customer"}

            res.render("index", {pizzas, priceSize, user}) 
        } catch (error) {
            next(error)  
        }
    }
}