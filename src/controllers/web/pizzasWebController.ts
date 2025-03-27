import { Handler } from "express";

export class PizzasWebController {
    index: Handler = async (req, res, next) => {
        try {
            const response = await fetch("http://localhost:3000/api/pizzas")
            const dados = await response.json()
            const pizzas = dados.pizzas

            const user = {role: "Admin"}

            res.render("index", {pizzas, user}) 
        } catch (error) {
            next(error)  
        }
    }
}