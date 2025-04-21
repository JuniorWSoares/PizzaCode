// Importa a biblioteca Zod, que é usada para validação e definição de esquemas de dados.
import { z } from "zod";

// Define o esquema para o registro de um usuário.
// Este esquema exige que o objeto tenha as propriedades:
// - "name" (string): Nome do usuário.
// - "email" (string): Email do usuário.
// - "password" (string): Senha do usuário.
// - "phone" (string): Telefone do usuário.
// - "dayOfBirth" (date): Data de nascimento do usuário, convertida para o tipo Date se necessário.
export const RegisterUserRequestSchema = z.object({
    name: z.string(), // Nome do usuário, deve ser uma string.
    email: z.string(), // Email do usuário, deve ser uma string.
    password: z.string(), // Senha do usuário, deve ser uma string.
    phone: z.string(), // Telefone do usuário, deve ser uma string.
    dayOfBirth: z.coerce.date() // Data de nascimento do usuário, convertida para o tipo Date.
});

// Define o esquema para o login de um usuário.
// Este esquema exige que o objeto tenha as propriedades:
// - "email" (string): Email do usuário.
// - "password" (string): Senha do usuário.
export const LoginUserRequestSchema = z.object({
    email: z.string(), // Email do usuário, deve ser uma string.
    password: z.string() // Senha do usuário, deve ser uma string.
});