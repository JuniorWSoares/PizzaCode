// Importa o Zod para validação de dados
import { z } from "zod";

// Esquema para registrar um usuário (name, email, password, phone são strings, dayOfBirth é convertido para Date)
export const RegisterUserRequestSchema = z.object({
    name: z.string(), // Nome do usuário
    email: z.string(), // Email do usuário
    password: z.string(), // Senha do usuário
    phone: z.string(), // Telefone do usuário
    dayOfBirth: z.coerce.date() // Data de nascimento
})

// Esquema para login de usuário (email e password são strings)
export const LoginUserRequestSchema = z.object({
    email: z.string(), // Email do usuário
    password: z.string() // Senha do usuário
})