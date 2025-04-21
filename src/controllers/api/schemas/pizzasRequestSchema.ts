// Importa a biblioteca Zod, que é usada para validação e definição de esquemas de dados.
import { z } from "zod";

// Define o esquema para a criação de uma pizza.
// Este esquema exige que o objeto tenha as propriedades "title" e "description", ambas do tipo string.
export const CreatePizzaRequestSchema = z.object({
    title: z.string(), // O título da pizza, deve ser uma string.
    description: z.string() // A descrição da pizza, deve ser uma string.
});

// Define o esquema para adicionar um tamanho de pizza.
// Este esquema exige que o objeto tenha as propriedades "pizzaId" (número), "price" (número) e "size" (enum com valores "P", "M" ou "G").
export const AddPizzaSizeRequestSchema = z.object({
    pizzaId: z.coerce.number(), // O ID da pizza, convertido para número se necessário.
    price: z.coerce.number(), // O preço do tamanho da pizza, convertido para número se necessário.
    size: z.enum(["P", "M", "G"]) // O tamanho da pizza, deve ser um dos valores "P", "M" ou "G".
});

// Define o esquema para atualizar o tamanho de uma pizza.
// Este esquema exige que o objeto tenha as propriedades "price" (número) e "size" (enum com valores "P", "M" ou "G").
export const UpdatePizzaSizeRequestSchema = z.object({
    price: z.coerce.number(), // O novo preço do tamanho da pizza, convertido para número se necessário.
    size: z.enum(["P", "M", "G"]) // O tamanho da pizza, deve ser um dos valores "P", "M" ou "G".
});