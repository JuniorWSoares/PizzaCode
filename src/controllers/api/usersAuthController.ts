import { Handler } from "express";
import { LoginUserRequestSchema, RegisterUserRequestSchema } from "./schemas/usersRequestSchema";
import { prisma } from "../../database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HttpError } from "../../errors/HttpError";

export class UsersAuthController {
    
    // Método "register": Registra um novo usuário.
    register: Handler = async (req, res, next) => {
        try {
            const body = RegisterUserRequestSchema.parse(req.body) // Valida dados

            const hashedPassword = await bcrypt.hash(body.password, 10) // Criptografa a senha
            body.password = hashedPassword

            // Verifica se email ou telefone já existem
            const emailExists = await prisma.user.findUnique({ where: { email: body.email } })
            const phoneExists = await prisma.user.findUnique({ where: { phone: body.phone } })

            if (emailExists || phoneExists) {
                throw new HttpError(409, "Email ou telefone já cadastrados")
            }

            const newUser = await prisma.user.create({ data: body }) // Cria usuário

            const secretKey = process.env.JWT_SECRET
            if (!secretKey) {
                throw new Error("Chave secreta não definida")
            }

            const payload = { email: newUser.email }
            const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }) // Gera token JWT

            // Define o token como um cookie HTTP-only
            res.cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 3600 * 1000 })

            res.redirect("/") // Redireciona
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    } 

    // Método "login": Autentica um usuário existente.
    login: Handler = async (req, res, next) => {
        try {
            const body = LoginUserRequestSchema.parse(req.body) // Valida dados

            const user = await prisma.user.findUnique({ where: { email: body.email } }) // Busca usuário
            const password = bcrypt.compareSync(body.password, user?.password || "") // Compara senha

            if (!user || !password) {
                throw new HttpError(401, "Credenciais inválidas")
            }

            const secretKey = process.env.JWT_SECRET
            if (!secretKey) {
                throw new Error("Chave secreta não definida")
            }

            const payload = { email: user.email }
            const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }) // Gera token JWT

            // Define o token como um cookie HTTP-only
            res.cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 3600 * 1000 })

            res.redirect("/") // Redireciona
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }

    // Método "logout": Encerra a sessão do usuário.
    logout: Handler = async (req, res, next) => {
        try {
            res.clearCookie("token", { httpOnly: true, sameSite: "strict" }) // Remove o cookie

            res.redirect("/") // Redireciona
        } catch (error) {
            next(error) // Passa o erro para o middleware
        }
    }
}