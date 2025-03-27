import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(err instanceof HttpError){
        res.status(err.status).json(err.message)
    }else if(err instanceof Error){
        res.status(500).json(err.message)
    } else{
        res.status(500).json({message: 'Erro desconhecido'})
    }
}