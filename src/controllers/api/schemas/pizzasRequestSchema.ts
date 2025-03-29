import { coerce, z } from "zod";

export const CreatePizzaRequestSchema = z.object({
    title: z.string(),
    description: z.string()
}) 