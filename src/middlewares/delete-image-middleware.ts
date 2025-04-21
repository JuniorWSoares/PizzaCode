// Importa os tipos necessários do Express para lidar com requisições, respostas e o próximo middleware.
import { NextFunction, Request, Response } from "express";
// Importa o cliente Prisma para interagir com o banco de dados.
import { prisma } from "../database";
// Importa a classe HttpError para lidar com erros personalizados.
import { HttpError } from "../errors/HttpError";
// Importa o módulo fs para manipulação de arquivos no sistema.
import fs from "node:fs";
// Importa o módulo path para manipulação de caminhos de arquivos.
import path from "node:path";

// Define o middleware para deletar uma imagem associada a um registro no banco de dados.
export const deleteImageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtém o ID do registro a partir dos parâmetros da requisição e o converte para número.
        const id = Number(req.params.id)

        // Busca no banco de dados o registro correspondente ao ID, selecionando apenas a URL da imagem.
        const record = await prisma.pizza.findUnique({
            where: { id },
            select: { url: true }
        })

        // Caso o registro não seja encontrado, lança um erro 404 indicando que o registro não existe.
        if (!record) throw new HttpError(404, "Registro nao encontrado.")

        // Verifica se o registro possui uma URL associada.
        if (record.url) {
            // Constrói o caminho completo da imagem no sistema de arquivos.
            const imagePath = path.join(__dirname, "../../public", record.url)

            // Verifica se o arquivo existe no caminho especificado.
            if (fs.existsSync(imagePath)) {
                // Remove o arquivo do sistema de arquivos.
                fs.unlinkSync(imagePath)
            }
        }

        // Chama o próximo middleware na cadeia.
        next()
    } catch (error) {
        // Em caso de erro, passa o erro para o próximo middleware de tratamento de erros.
        next(error)
    }
}