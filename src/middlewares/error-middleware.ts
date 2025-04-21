// Importa o tipo ErrorRequestHandler do Express para lidar com erros em middlewares.
import { ErrorRequestHandler } from "express";
// Importa a classe HttpError para lidar com erros personalizados.
import { HttpError } from "../errors/HttpError";

// Define o middleware de tratamento de erros.
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Verifica se o erro é uma instância de HttpError (erro personalizado).
    if (err instanceof HttpError) {
        // Retorna uma resposta com o status e a mensagem do erro personalizado.
        res.status(err.status).json({ error: err.message });
    } 
    // Verifica se o erro é uma instância da classe Error (erro genérico do JavaScript).
    else if (err instanceof Error) {
        // Retorna uma resposta com status 500 (erro interno do servidor) e detalhes do erro.
        res.status(500).json({ error: "Erro interno do servidor", details: err.message });
    } 
    // Caso o erro não seja uma instância conhecida, trata como erro desconhecido.
    else {
        // Retorna uma resposta com status 500 e informações genéricas sobre o erro.
        res.status(500).json({ error: "Erro desconhecido", details: err });
    }
};