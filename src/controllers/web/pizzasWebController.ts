// Importa o tipo "Handler" do Express, que representa um middleware ou manipulador de rota.
// Também importa o cliente Prisma para interagir com o banco de dados.
import { Handler } from "express";
import { prisma } from "../../database";

// Define a interface "UserData" para representar os dados do usuário que serão utilizados na aplicação.
interface UserData {
    id: number // ID do usuário.
    name: string // Nome do usuário.
    role: string // Papel do usuário (ex.: Admin, Cliente, etc.).
    dayOfBirth: Date | null // Data de nascimento do usuário (pode ser nula).
}

// Define a classe "PizzasWebController", que contém métodos para renderizar páginas web relacionadas às pizzas.
export class PizzasWebController {
    
    // Método "index": Responsável por renderizar a página inicial com a lista de pizzas e dados do usuário.
    index: Handler = async (req, res, next) => {
        try {
            // Busca todas as pizzas no banco de dados, incluindo os tamanhos disponíveis para cada pizza.
            const pizzas = await prisma.pizza.findMany({
                orderBy: { title: "asc" },
                include: { PizzaSizes: { orderBy: { size: "desc" } } }
            })

            // Obtém os dados do usuário autenticado do objeto `res.locals`.
            const userData: UserData = res.locals.user

            // Renderiza a página "index" com a lista de pizzas e os dados do usuário.
            return res.render("index", { pizzas, userData })

        } catch (error) {
            // Em caso de erro, passa o erro para o middleware de tratamento de erros.
            next(error) // Encaminha erros ao middleware.
        }
    }

    // Método "admin": Responsável por renderizar a página de administração com a lista de pizzas e dados do usuário.
    admin: Handler = async (req, res, next) => {
        try {
            // Busca todas as pizzas no banco de dados, incluindo os tamanhos disponíveis para cada pizza.
            const pizzas = await prisma.pizza.findMany({
                orderBy: { title: "asc" },
                include: { PizzaSizes: { orderBy: { size: "desc" } } }
            })

            // Obtém os dados do usuário autenticado do objeto `res.locals`.
            const userData: UserData = res.locals.user

            // Renderiza a página "admin" com a lista de pizzas e os dados do usuário.
            res.render("admin", { pizzas, userData })

        } catch (error) {
            // Em caso de erro, passa o erro para o middleware de tratamento de erros.
            next(error) // Encaminha erros ao middleware.
        }
    }
}