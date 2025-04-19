import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(err instanceof HttpError){
        res.status(err.status).json({ error: err.message })
    }else if(err instanceof Error){
        res.status(500).json({error: "Erro interno do servidor", details: err.message })
    } else{
        res.status(500).json({ error: "Erro desconhecido", details: err });
    }
}