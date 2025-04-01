import { z } from "zod";

export const CreatePizzaRequestSchema = z.object({
    title: z.string(),
    description: z.string()
}) 

export const AddPizzaSizeRequestSchema = z.object({
    pizzaId: z.coerce.number(),
    price: z.coerce.number(),
    size: z.enum(["P", "M", "G"])
})

export const UpdatePizzaSizeRequestSchema = z.object({
    price: z.coerce.number(),
    size: z.enum(["P", "M", "G"])
})