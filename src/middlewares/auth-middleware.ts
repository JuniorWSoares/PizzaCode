import jwt from "jsonwebtoken";
import { Handler } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";

// Define o middleware de autenticação que verifica a presença e validade de um token JWT.
export const authMiddleware: Handler = async (req, res, next) => {
    // Obtém o token JWT dos cookies da requisição.
    const token = req.cookies?.token
    // Obtém a chave secreta para validação do token das variáveis de ambiente.
    const secretKey = process.env.JWT_SECRET

    // Caso o token não esteja presente, define o usuário como nulo no objeto `res.locals`
    // e chama o próximo middleware.
    if (!token) {
        res.locals.user = { role: "" }
        next()
        return
    }

    // Caso a chave secreta não esteja definida, lança um erro indicando o problema.
    if (!secretKey) {
        throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.")
    }

    try {
        // Tenta verificar e decodificar o token usando a chave secreta.
        const decoded = jwt.verify(token, secretKey) as { email: string }

        // Busca o usuário no banco de dados com base no email decodificado do token.
        const user = await prisma.user.findUnique({ where: { email: decoded.email } })
        if (!user) throw new HttpError(404, "Usuário não encontrado") // Lança um erro se o usuário não for encontrado.

        // Cria um objeto com os dados do usuário para armazenar em `res.locals`.
        const userData = {
            id: user.id, // ID do usuário.
            name: user.name.split(" ")[0], // Obtém apenas o primeiro nome do usuário.
            role: user.role, // Papel do usuário (ex.: Admin, Cliente, etc.).
            dayOfBirth: user.dayOfBirth, // Data de nascimento do usuário.
        }

        // Armazena os dados do usuário no objeto `res.locals` para uso posterior.
        res.locals.user = userData
        // Chama o próximo middleware.
        next()
    } catch (error) {
        // Em caso de erro na verificação do token, passa o erro para o próximo middleware.
        next(error)
    }
}

// Define o middleware que garante que o usuário seja um administrador.
export const ensureUserIsAdmin: Handler = (req, res, next) => {
    // Verifica se o usuário está autenticado e se é um administrador.
    if (!res.locals.user || res.locals.user.role !== "Admin") {
        // Se não for, lança um erro de autorização com o código HTTP 403.
        throw new HttpError(403, "Acesso negado. Você não tem permissão para acessar esta página.")
    }
    // Se for, chama o próximo middleware.
    next()
}