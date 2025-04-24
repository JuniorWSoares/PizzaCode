// Importa o tipo "Handler" do Express, os esquemas de validação para requisições de usuários,
// o cliente Prisma para interagir com o banco de dados, e bibliotecas para autenticação e criptografia.
import { Handler } from "express";
import { LoginUserRequestSchema, RegisterUserRequestSchema } from "./schemas/usersRequestSchema";
import { prisma } from "../../database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { HttpError } from "../../errors/HttpError";

// Define a classe UsersAuthController, que contém os métodos para manipular autenticação de usuários.
export class UsersAuthController {
    
    // Método "register": Responsável por registrar um novo usuário.
    register: Handler = async (req, res, next) => {
        try {
            // Valida os dados da requisição usando o esquema "RegisterUserRequestSchema".
            const body = RegisterUserRequestSchema.parse(req.body)

            // Criptografa a senha do usuário antes de salvar no banco de dados.
            const hashedPassword = await bcrypt.hash(body.password, 10)
            body.password = hashedPassword

            // Verifica se o email ou telefone já estão cadastrados no banco de dados.
            const emailExists = await prisma.user.findUnique({ where: { email: body.email } })
            const phoneExists = await prisma.user.findUnique({ where: { phone: body.phone } })

            if (emailExists || phoneExists) {
                // Lança um erro caso o email ou telefone já estejam cadastrados.
                throw new HttpError(409, "Email ou telefone já cadastrados!")
            }

            // Cria um novo usuário no banco de dados.
            const newUser = await prisma.user.create({ data: body })

            // Obtém a chave secreta para gerar o token JWT.
            const secretKey = process.env.JWT_SECRET
            if (!secretKey) {
                throw new Error("Chave secreta não definida")
            }

            // Gera um token JWT com o email do usuário como payload.
            const payload = { email: newUser.email }
            const token = jwt.sign(payload, secretKey, { expiresIn: "1h" })

            // Define o token como um cookie HTTP-only no cliente.
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 3600 * 1000, // Expira em 1 hora.
            })

            // Redireciona o usuário para a página inicial.
            res.redirect("/")
        } catch (error) {
            // Passa o erro para o middleware de tratamento de erros.
            next(error)
        }
    }

    // Método "login": Responsável por autenticar um usuário existente.
    login: Handler = async (req, res, next) => {
        try {
            // Valida os dados da requisição usando o esquema "LoginUserRequestSchema".
            const body = LoginUserRequestSchema.parse(req.body)

            // Busca o usuário no banco de dados pelo email.
            const user = await prisma.user.findUnique({ where: { email: body.email } })

            // Verifica se a senha fornecida corresponde à senha armazenada.
            const password = bcrypt.compareSync(body.password, user?.password || "")

            if (!user || !password) {
                // Lança um erro caso o email ou a senha sejam inválidos.
                throw new HttpError(401, "Ops! Algo está errado com seu e-mail ou senha.")
            }

            // Obtém a chave secreta para gerar o token JWT.
            const secretKey = process.env.JWT_SECRET
            if (!secretKey) {
                throw new Error("Chave secreta não definida")
            }

            // Gera um token JWT com o email do usuário como payload.
            const payload = { email: user.email }
            const token = jwt.sign(payload, secretKey, { expiresIn: "1h" })

            // Define o token como um cookie HTTP-only no cliente.
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 3600 * 1000, // Expira em 1 hora.
            })

            // Redireciona o usuário para a página inicial.
            res.redirect("/")
        } catch (error) {
            // Passa o erro para o middleware de tratamento de erros.
            next(error)
        }
    }

    // Método "logout": Responsável por encerrar a sessão do usuário.
    logout: Handler = async (req, res, next) => {
        try {
            // Remove o cookie chamado "token" do cliente.
            res.clearCookie("token", {
                httpOnly: true,
                sameSite: "strict",
            })

            // Redireciona o usuário para a página inicial.
            res.redirect("/")
        } catch (error) {
            // Passa o erro para o middleware de tratamento de erros.
            next(error)
        }
    }
}