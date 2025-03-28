import { Handler } from "express";

export class PizzasWebController {
    index: Handler = async (req, res, next) => {
        try {
            const response = await fetch("http://localhost:3000/api/pizzas")
            const dados = await response.json()
            const pizzas = dados.pizzas
            const priceSize = dados.priceSize

            const user = {role: "Admin"}

            res.render("index", {pizzas, priceSize, user}) 
        } catch (error) {
            next(error)  
        }
    }
}