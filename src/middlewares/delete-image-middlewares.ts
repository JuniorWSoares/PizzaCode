import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import fs from "node:fs";
import path from "node:path";

// Middleware para deletar a imagem associada ao registro no banco de dados.
export const deleteImageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id) // Obtém o ID do registro.
        const record = await prisma.pizzaType.findUnique({
            where: { id },
            select: { url: true } // Obtém a URL da imagem associada ao registro.
        }) 

        if (!record) throw new HttpError(404, "Imagem nao encontrada") // Se o registro não existir, gera um erro.

        if (record.url) {
            const imagePath = path.join(__dirname, "../../public", record.url) // Caminho completo da imagem.
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath) // Remove o arquivo de imagem do sistema de arquivos.
            }
        }

        next() // Chama o próximo middleware.
    } catch (error) {
        next(error) // Passa o erro para o próximo middleware.
    }
}

// Middleware para atualizar a imagem associada ao registro no banco de dados.
export const updateImageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id) // Obtém o ID do registro.
        const record = await prisma.pizzaType.findUnique({
            where: { id },
            select: { url: true } // Obtém a URL da imagem associada ao registro.
        })

        if (!req.file?.filename) {
            res.locals.record = record // Armazena o registro se não houver novo arquivo.
            return next()
        }

        if (!record) throw new HttpError(404, "Imagem nao encontrada") // Se o registro não existir, gera um erro.

        if (record.url) {
            const imagePath = path.join(__dirname, "../../public", record.url) // Caminho completo da imagem.
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath) // Remove a imagem antiga.
            }
        }

        next() // Chama o próximo middleware.
    } catch (error) {
        next(error) // Passa o erro para o próximo middleware.
    }
}