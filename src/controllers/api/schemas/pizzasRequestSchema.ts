// Importa o Zod para validação de dados
import { z } from "zod";

// Esquema para criar tipo de pizza (title e description são strings)
export const CreatePizzaTypeRequestSchema = z.object({
    title: z.string(), // Título da pizza
    description: z.string() // Descrição da pizza
})

// Esquema para adicionar tamanho de pizza (pizzaTypeId, price são números, size é enum)
export const AddPizzaRequestSchema = z.object({
    pizzaTypeId: z.coerce.number(), // ID da pizza
    price: z.coerce.number(), // Preço do tamanho
    size: z.enum(["P", "M", "G"]) // Tamanho da pizza
})

// Esquema para atualizar tamanho de pizza (price é número, size é enum)
export const UpdatePizzaRequestSchema = z.object({
    price: z.coerce.number(), // Novo preço
    size: z.enum(["P", "M", "G"]) // Novo tamanho
})