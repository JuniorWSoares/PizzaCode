import { z } from "zod";

export const CreateUserRequestSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    dayOfBirth: z.coerce.date()
})