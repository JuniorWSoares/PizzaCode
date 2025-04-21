// Importa o cliente Prisma, que é utilizado para interagir com o banco de dados.
import { PrismaClient } from "@prisma/client";

// Cria uma instância do PrismaClient e a exporta para ser utilizada em outras partes da aplicação.
// Essa instância permite realizar operações no banco de dados, como consultas, inserções, atualizações e exclusões.
export const prisma = new PrismaClient()