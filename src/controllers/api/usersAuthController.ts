import { Handler } from "express";
import { LoginUserRequestSchema, RegisterUserRequestSchema } from "./schemas/usersRequestSchema";
import { prisma } from "../../database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HttpError } from "../../errors/HttpError";

export class UsersAuthController {
    
    register: Handler = async (req, res, next) => {
        try {
            const body = RegisterUserRequestSchema.parse(req.body)
            const hashedPassword = await bcrypt.hash(body.password, 10)
            body.password = hashedPassword

            const emailExists = await prisma.user.findUnique({where: { email: body.email }})
            const phoneExists = await prisma.user.findUnique({where: { phone: body.phone }})

            if (emailExists || phoneExists) {
                throw new HttpError(409 ,"Email ou telefone já cadastrados!")
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

    login: Handler = async (req, res, next) => {
        try {
            const body = LoginUserRequestSchema.parse(req.body)
            const user = await prisma.user.findUnique({where: { email: body.email }})
            const password = bcrypt.compareSync(body.password, user?.password || "")

            if(!user || !password) {
                throw new HttpError(401, "Email ou senha inválidos!")
            }

            const secretKey = process.env.JWT_SECRET
            if (!secretKey) {
                throw new Error("Chave secreta não definida")
            }

            const payload = {email: user.email}
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

    logout: Handler = async (req, res, next) => {
        try {
            // Remove o cookie chamado "token"
            res.clearCookie("token", {
                httpOnly: true,
                sameSite: "strict",
            })
            // res.locals.user = null
            res.redirect("/")
        } catch (error) {
            next(error)
        }
    }
}