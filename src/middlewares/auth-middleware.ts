import jwt from "jsonwebtoken";
import { Handler } from "express";

export const authMiddleware: Handler = (req, res, next) => {
    const token = req.cookies?.token
    const secretKey = process.env.JWT_SECRET

    if (!token) {
        res.locals.user = null
        next()
        return 
    }

    if (!secretKey) {
        throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
    }

    try {
        const decoded = jwt.verify(token, secretKey)
        res.locals.user = decoded
        next()
    } catch (error) {
        next(error)
    }
}