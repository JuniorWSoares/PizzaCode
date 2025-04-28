import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";
import { PizzasWebController } from "../controllers/web/pizzasWebController";

const pizzasWebController = new PizzasWebController()

// Middleware de tratamento de erros.
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Verifica se o erro é um HttpError (erro personalizado).
    if (err instanceof HttpError) {
        res.locals.alert = {message: err.message, status: err.status}

        if(res.locals.user.role === "Admin"){
            return pizzasWebController.admin(req, res, next)
        }

        return pizzasWebController.index(req, res, next)
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