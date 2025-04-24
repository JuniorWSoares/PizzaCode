import { Handler } from "express";
import { CreateOrderRequestSchema } from "./schemas/ordersRequestSchema";
import { prisma } from "../../database";
import { HttpError } from "../../errors/HttpError";
import { number } from "zod";

interface User {
    id: number // ID do usuário
    role: string // Papel do usuário (ex: admin, cliente, etc.)
    name: string // Nome do usuário
    dayOfBirth: Date // Data de nascimento do usuário
}

// Define a classe OrdersApiController, que contém os métodos para manipular as requisições relacionadas a pedidos.
export class OrdersApiController {
    // Método "index": Responsável por listar todos os pedidos.
    index: Handler = async (req, res, next) => {
        try {
            // Lógica para listar pedidos será implementada aqui.
        } catch (error) {
            // Passa o erro para o middleware de tratamento de erros.
            next(error)
        }
    }
    
    // Responsável por criar um novo pedido.
    addingToOrder: Handler = async (req, res, next) => {
        try {
            // Valida e analisa o corpo da requisição usando o esquema definido.
            const pizza = CreateOrderRequestSchema.parse(JSON.parse(req.body.pizza))
            const user: User = res.locals.user // Obtém os dados do usuário autenticado.

            // Se o usuário não estiver autenticado, lança um erro de autorização.
            if (user.role === '') throw new HttpError(401, "Usuário não autenticado.")

            // Verifica se já existe um pedido pendente para o usuário.
            const pendingOrder = await prisma.order.findFirst({where: {status: "PENDING", customerId: user.id}}) 

            if(!pendingOrder) {
                // Se não houver um pedido pendente, cria um novo.

                await prisma.order.create({
                    data: {
                        total: pizza.price,
                        customerId: user.id,
                        pizzas: {create: [ {pizzaId: pizza.id} ]}
                    },
                    // Inclui os detalhes da pizza associada ao pedido.
                    include: { pizzas: { include: { pizza: true } }}
                })

                return res.redirect("/#menu")
            }

            const total = Number(pendingOrder.total) + pizza.price

            const existingPizzaOrder = await prisma.orderPizzas.findUnique({
                where: {pizzaId_orderId: {pizzaId: pizza.id, orderId: pendingOrder.id}}
            })

            if(existingPizzaOrder) {
                // Se a pizza já estiver no pedido, atualiza a quantidade.
                await prisma.order.update({
                    where: { id: pendingOrder.id }, 
                    data: { 
                        total,
                        pizzas: { 
                            update: {
                                where: {pizzaId_orderId: {pizzaId: pizza.id, orderId: pendingOrder.id}},
                                data: {quantity: {increment: 1}}
                            } 
                        }
                    }
                })
            } else {
                // Caso contrário, cria uma nova entrada
                await prisma.order.update({
                    where: { id: pendingOrder.id },
                    data: {
                        total,
                        pizzas: {
                            create: [{ pizzaId: pizza.id }]
                        }
                    }
                })
            }

            return res.redirect("/#menu")

        } catch (error) {
            // Passa o erro para o middleware de tratamento de erros.
            next(error)
        }
    }

    // Método "show": Responsável por exibir os detalhes de um pedido específico.
    show: Handler = async (req, res, next) => {
        try {
            // Lógica para exibir um pedido será implementada aqui.
        } catch (error) {
            // Passa o erro para o middleware de tratamento de erros.
            next(error)
        }
    }

    // Método "update": Responsável por atualizar um pedido existente.
    update: Handler = async (req, res, next) => {
        try {
            // Lógica para atualizar um pedido será implementada aqui.
        } catch (error) {
            // Passa o erro para o middleware de tratamento de erros.
            next(error)
        }
    }

    // Método "delete": Responsável por excluir um pedido.
    delete: Handler = async (req, res, next) => {
        try {
            // Lógica para excluir um pedido será implementada aqui.
        } catch (error) {
            // Passa o erro para o middleware de tratamento de erros.
            next(error)
        } 
    }
}