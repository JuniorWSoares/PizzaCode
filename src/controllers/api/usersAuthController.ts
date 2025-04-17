import { Handler } from "express";
import { CreateUserRequestSchema } from "./schemas/usersRequestSchema";
import { prisma } from "../../database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class UsersAuthController {
    
    create: Handler = async (req, res, next) => {
        try {
            const body = CreateUserRequestSchema.parse(req.body)
            const hashedPassword = await bcrypt.hash(body.password, 10)
            body.password = hashedPassword

            const userExists = await prisma.user.findUnique({
                where: { email: body.email }
            })

            if (userExists) {
                throw new Error("Usuário já existe")
            }

            const newUser = await prisma.user.create({data: body})

            const secretKey = process.env.JWT_SECRET
            if (!secretKey) {
                throw new Error("Chave secreta não definida")
            }

            const payload = {email: newUser.email}
            const token = jwt.sign(payload, secretKey, {expiresIn: "1h"}) 

            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 3600 * 1000
            })

            res.redirect("/")
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            
            
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}