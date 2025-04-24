import { z } from "zod";

export const CreateOrderRequestSchema = z.object({
    id: z.coerce.number(), // O ID do pedido, convertido para número se necessário.
    pizzaTypeId: z.coerce.number(), // O ID do tipo de pizza, convertido para número se necessário.
    size: z.enum(["P", "M", "G"]), // O tamanho da pizza, deve ser um dos valores do enum definido.
    price: z.coerce.number(), // O preço da pizza, convertido para número se necessário.
})