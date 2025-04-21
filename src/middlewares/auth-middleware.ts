// Importa o módulo jwt para manipulação de tokens JWT.
import jwt from "jsonwebtoken";
// Importa o tipo Handler do Express, que representa um middleware.
import { Handler } from "express";

// Define o middleware de autenticação que verifica a presença e validade de um token JWT.
export const authMiddleware: Handler = (req, res, next) => {
    // Obtém o token JWT dos cookies da requisição.
    const token = req.cookies?.token
    // Obtém a chave secreta para validação do token das variáveis de ambiente.
    const secretKey = process.env.JWT_SECRET

    // Caso o token não esteja presente, define o usuário como nulo no objeto `res.locals`
    // e chama o próximo middleware.
    if (!token) {
        res.locals.user = null
        next()
        return
    }

    // Caso a chave secreta não esteja definida, lança um erro indicando o problema.
    if (!secretKey) {
        throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.")
    }

    try {
        // Tenta verificar e decodificar o token usando a chave secreta.
        const decoded = jwt.verify(token, secretKey)
        // Armazena as informações decodificadas do token no objeto `res.locals.user`.
        res.locals.user = decoded
        // Chama o próximo middleware.
        next()
    } catch (error) {
        // Em caso de erro na verificação do token, passa o erro para o próximo middleware.
        next(error)
    }
}