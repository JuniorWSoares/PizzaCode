import jwt from "jsonwebtoken";
import { Handler } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";

// Middleware de autenticação para verificar e validar o token JWT.
export const authMiddleware: Handler = async (req, res, next) => {
    // Obtém o token JWT dos cookies.
    const token = req.cookies?.token
    // Obtém a chave secreta para validar o token.
    const secretKey = process.env.JWT_SECRET

    // Se não houver token, define o usuário como nulo e prossegue para o próximo middleware.
    if (!token) {
        res.locals.user = { role: "" }
        next()
        return
    }

    // Se a chave secreta não estiver definida, lança um erro.
    if (!secretKey) {
        throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.")
    }

    try {
        // Decodifica o token usando a chave secreta.
        const decoded = jwt.verify(token, secretKey) as { email: string }

        // Busca o usuário no banco de dados usando o email decodificado.
        const user = await prisma.user.findUnique({ where: { email: decoded.email } })
        if (!user) throw new HttpError(404, "Usuário não encontrado")

        // Cria um objeto com os dados do usuário.
        const userData = {
            id: user.id,
            name: user.name.split(" ")[0], // Obtém o primeiro nome.
            role: user.role, // Papel do usuário.
            dayOfBirth: user.dayOfBirth, // Data de nascimento.
        }

        // Armazena os dados do usuário em `res.locals` para uso posterior.
        res.locals.user = userData
        next() // Chama o próximo middleware.
    } catch (error) {
        next(error) // Passa o erro para o próximo middleware.
    }
}

// Middleware para garantir que o usuário seja um administrador.
export const ensureUserIsAdmin: Handler = (req, res, next) => {
    // Verifica se o usuário está autenticado e se é um administrador.
    if (!res.locals.user || res.locals.user.role !== "Admin") {
        throw new HttpError(403, "Acesso negado")
    }
    next() // Chama o próximo middleware se for administrador.
}