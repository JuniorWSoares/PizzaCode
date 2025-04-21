import { z } from "zod";

export const RegisterUserRequestSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    dayOfBirth: z.coerce.date()
})

export const LoginUserRequestSchema = z.object({
    email: z.string(),
    password: z.string()
})