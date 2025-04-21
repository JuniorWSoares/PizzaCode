// Importa o tipo "Handler" do Express e o cliente Prisma para interagir com o banco de dados.
import { Handler } from "express";
import { prisma } from "../../database";

// Define a interface "UserData" para representar os dados do usuário que serão utilizados na aplicação.
interface UserData {
    id?: number // ID do usuário (opcional).
    name?: string // Nome do usuário (opcional).
    role?: string // Papel do usuário (opcional).
    dayOfBirth?: Date | null // Data de nascimento do usuário (opcional).
}

// Define a classe "PizzasWebController", que contém métodos para renderizar páginas web relacionadas às pizzas.
export class PizzasWebController {
    
    // Método "index": Responsável por renderizar a página inicial com a lista de pizzas e dados do usuário.
    index: Handler = async (req, res, next) => {
        try {
            // Busca todas as pizzas no banco de dados, incluindo os tamanhos disponíveis para cada pizza.
            const pizzas = await prisma.pizza.findMany({ include: { PizzaSizes: true } })

            // Inicializa os dados do usuário com um papel vazio.
            let userData: UserData = { role: "" }

            // Verifica se há um usuário autenticado nos dados locais da resposta.
            if (res.locals.user) {
                // Busca os dados do usuário no banco de dados pelo email.
                const user = await prisma.user.findUnique({ where: { email: res.locals.user.email } })
                if (!user) throw new Error("Usuário não encontrado") // Lança um erro se o usuário não for encontrado.

                // Preenche os dados do usuário com as informações obtidas do banco de dados.
                userData = {
                    id: user.id,
                    name: user.name.split(" ")[0], // Obtém apenas o primeiro nome do usuário.
                    role: user.role,
                    dayOfBirth: user.dayOfBirth,
                }
            }

            // Renderiza a página "index" com a lista de pizzas e os dados do usuário.
            res.render("index", { pizzas, userData })
        } catch (error) {
            // Passa o erro para o middleware de tratamento de erros.
            next(error)
        }
    }

    // Método "admin": Responsável por renderizar a página de administração com a lista de pizzas e dados do usuário.
    admin: Handler = async (req, res, next) => {
        try {
            // Busca todas as pizzas no banco de dados, incluindo os tamanhos disponíveis para cada pizza.
            const pizzas = await prisma.pizza.findMany({ include: { PizzaSizes: true } })

            // Busca os dados do usuário autenticado no banco de dados pelo email.
            const user = await prisma.user.findUnique({ where: { email: res.locals.user.email } })
            if (!user) throw new Error("Usuário não encontrado") // Lança um erro se o usuário não for encontrado.

            // Preenche os dados do usuário com as informações obtidas do banco de dados.
            const userData = {
                id: user.id,
                name: user.name.split(" ")[0], // Obtém apenas o primeiro nome do usuário.
                role: user.role,
                dayOfBirth: user.dayOfBirth,
            }

            // Renderiza a página "admin" com a lista de pizzas e os dados do usuário.
            res.render("admin", { pizzas, userData })
        } catch (error) {
            // Passa o erro para o middleware de tratamento de erros.
            next(error)
        }
    }
}