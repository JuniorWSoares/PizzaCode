import { Pizza, PizzaSize } from "@prisma/client";
import { Handler } from "express";

interface PizzasApiResponse {
    pizzas: Pizza[];
    priceSize: PizzaSize[];
}

export class PizzasWebController {
    index: Handler = async (req, res, next) => {
        try {
            const apiUrl = "http://localhost:3000/api/pizzas";
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Erro ao buscar dados da API: ${response.statusText}`);
            }

            const { pizzas, priceSize }: PizzasApiResponse = await response.json();

            const user = { role: "Customer" };

            res.render("index", { pizzas, priceSize, user });
        } catch (error) {
            console.error("Erro no controlador de pizzas:", error);
            next(error);
        }
    };
}