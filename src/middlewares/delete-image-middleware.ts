import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import fs from "node:fs"
import path from "node:path"

export const deleteImageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id)

        const record = await prisma.pizza.findUnique({
            where: {id},
            select: {url: true}
        }) 

        if (!record) throw new HttpError(404, "Registro nao encontrado.")

        if(record.url) {
            const imagePath = path.join(__dirname, "../../public", record.url)

            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath)
            }
        }

        next()
    } catch (error) {
        next(error)
    }
}