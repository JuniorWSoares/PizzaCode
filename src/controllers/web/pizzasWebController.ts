import { Handler } from "express";
import { prisma } from "../../database";
interface UserData {
    id?: number
    name?: string
    role?: string
    dayOfBirth?: Date | null
}
export class PizzasWebController {
    index: Handler = async (req, res, next) => {
        try {
            const pizzas = await prisma.pizza.findMany({include: {PizzaSizes: true}})
            let userData: UserData = {role: ""}

            if(res.locals.user) {
               const user = await prisma.user.findUnique({where: {email: res.locals.user.email}})
                if(!user) throw new Error("Usuário não encontrado")
                
                userData = {
                    id: user.id,
                    name: user.name.split(" ")[0],
                    role: user.role,
                    dayOfBirth: user.dayOfBirth
                }
            }

            res.render("index", { pizzas, userData })
        } catch (error) {
            next(error)
        }
    }

    admin: Handler = async (req, res, next) => {
        try {
            const pizzas = await prisma.pizza.findMany({include: {PizzaSizes: true}})
            const user = await prisma.user.findUnique({where: {email: res.locals.user.email}})
                if(!user) throw new Error("Usuário não encontrado")
                
                const userData = {
                    id: user.id,
                    name: user.name.split(" ")[0],
                    role: user.role,
                    dayOfBirth: user.dayOfBirth
                }

            res.render("admin", { pizzas, userData })
        } catch (error) {
            next(error)
        }
    }
}