import { Handler } from "express";
import { prisma } from "../../database";

interface UserData {
    id: number // ID do usuário
    name: string // Nome do usuário
    role: string // Papel do usuário (ex.: Admin, Cliente, etc.)
    dayOfBirth: Date | null // Data de nascimento do usuário (pode ser nula)
}

export class PizzasWebController {

    // Método "index": Renderiza a página inicial com pizzas e dados do usuário.
    index: Handler = async (req, res, next) => {
        try {
            // Busca as pizzas com seus tamanhos disponíveis.
            const pizzaTypes = await prisma.pizzaType.findMany({
                orderBy: { title: "asc" },
                include: { pizzas: { orderBy: { size: "desc" } } }
            })

            const alert = res.locals.alert || {message: "", status: ""} // Verifica mensagem de alerta
            const userData: UserData = res.locals.user // Dados do usuário autenticado

            // Renderiza a página "index".
            return res.render("index", { pizzaTypes, userData, alert })

        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }

    // Método "admin": Renderiza a página de administração com pizzas e dados do usuário.
    admin: Handler = async (req, res, next) => {
        try {
            // Busca as pizzas com seus tamanhos disponíveis.
            const pizzaTypes = await prisma.pizzaType.findMany({
                orderBy: { title: "asc" },
                include: { pizzas: { orderBy: { size: "desc" } } }
            })

            const alert = res.locals.alert || {message: "", status: ""} // Verifica mensagem de alerta
            const userData: UserData = res.locals.user // Dados do usuário autenticado

            // Renderiza a página "admin".
            res.render("admin", { pizzaTypes, userData, alert })

        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }
}