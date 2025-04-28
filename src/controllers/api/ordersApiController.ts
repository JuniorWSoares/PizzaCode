import { Handler } from "express";
import { CreateOrderRequestSchema } from "./schemas/ordersRequestSchema";
import { prisma } from "../../database";
import { HttpError } from "../../errors/HttpError";

interface User {
    id: number // ID do usuário
    role: string // Papel do usuário
    name: string // Nome do usuário
    dayOfBirth: Date // Data de nascimento do usuário
}

export class OrdersApiController {
    // Método "index": Lista todos os pedidos
    index: Handler = async (req, res, next) => {
        try {
            // Lógica para listar pedidos
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }

    // Método "addingToOrder": Cria ou atualiza um pedido
    addingToOrder: Handler = async (req, res, next) => {
        try {
            const pizza = CreateOrderRequestSchema.parse(JSON.parse(req.body.pizza)); // Valida dados da pizza
            const user: User = res.locals.user // Dados do usuário autenticado

            // Verifica se o usuário está logado
            if (user.role === '') throw new HttpError(401, "Usuário não autenticado")

            // Verifica se já existe um pedido pendente para o usuário
            const pendingOrder = await prisma.order.findFirst({
                where: { status: "PENDING", customerId: user.id }
            })

            if (!pendingOrder) {
                // Cria um novo pedido se não houver pendente
                await prisma.order.create({
                    data: {
                        total: pizza.price,
                        customerId: user.id,
                        pizzas: { create: [{ pizzaId: pizza.id }] }
                    },
                    include: { pizzas: { include: { pizza: true } } }
                })
                return res.redirect("/#menu")
            }

            const total = Number(pendingOrder.total) + pizza.price;

            // Verifica se a pizza já foi adicionada ao pedido
            const existingPizzaOrder = await prisma.orderPizzas.findUnique({
                where: { pizzaId_orderId: { pizzaId: pizza.id, orderId: pendingOrder.id } }
            })

            if (existingPizzaOrder) {
                // Atualiza a quantidade da pizza no pedido
                await prisma.order.update({
                    where: { id: pendingOrder.id },
                    data: {
                        total,
                        pizzas: {
                            update: {
                                where: { pizzaId_orderId: { pizzaId: pizza.id, orderId: pendingOrder.id } },
                                data: { quantity: { increment: 1 } }
                            }
                        }
                    }
                })
            } else {
                // Adiciona a pizza ao pedido
                await prisma.order.update({
                    where: { id: pendingOrder.id },
                    data: {
                        total,
                        pizzas: { create: [{ pizzaId: pizza.id }] }
                    }
                })
            }

            return res.redirect("/#menu");
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }

    // Método "show": Exibe detalhes de um pedido específico
    show: Handler = async (req, res, next) => {
        try {
            // Lógica para exibir um pedido
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }

    // Método "update": Atualiza um pedido existente
    update: Handler = async (req, res, next) => {
        try {
            // Lógica para atualizar um pedido
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }

    // Método "delete": Exclui um pedido
    delete: Handler = async (req, res, next) => {
        try {
            // Lógica para excluir um pedido
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }
}