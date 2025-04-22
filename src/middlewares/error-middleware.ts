import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";

// Middleware de tratamento de erros.
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Verifica se o erro é um HttpError (erro personalizado).
    if (err instanceof HttpError) {
        // Redireciona para a página inicial se o status for 403.
        if (err.status === 403) {
            return res.redirect("/")
        }
        // Retorna o status e a mensagem do erro em formato JSON.
        res.status(err.status).json({ error: err.message })
    } 
    // Verifica se o erro é uma instância genérica de Error.
    else if (err instanceof Error) {
        // Retorna status 500 com mensagem genérica e detalhes do erro.
        res.status(500).json({ error: "Erro interno do servidor", details: err.message })
    } 
    // Trata erros desconhecidos.
    else {
        // Retorna status 500 com informações genéricas sobre o erro.
        res.status(500).json({ error: "Erro desconhecido", details: err })
    }
}