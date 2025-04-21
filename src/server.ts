// Importa os módulos necessários
import express from "express" // Framework para criar o servidor
import path from "node:path" // Módulo para manipulação de caminhos de arquivos
import cors from "cors" // Middleware para habilitar CORS
import usersAuthRouter from "./routes/api/usersAuthRouter" // Rotas de autenticação de usuários
import ordersApiRouter from "./routes/api/ordersApiRouter" // Rotas da API de pedidos
import pizzasApiRouter from "./routes/api/pizzasApiRouter" // Rotas da API de pizzas
import pizzasWebRouter from "./routes/web/pizzasWebRouter" // Rotas web relacionadas às pizzas
import { errorHandler } from "./middlewares/error-middleware" // Middleware para tratamento de erros
import cookieParser from "cookie-parser" // Middleware para manipulação de cookies

// Cria a aplicação Express
const app = express()

// Configura o mecanismo de visualização para EJS
app.set("view engine", "ejs") // Define EJS como o motor de templates
app.set("views", path.join(__dirname, "views")) // Define o diretório das views

// Middlewares globais
app.use(express.static("public")) // Serve arquivos estáticos da pasta "public"
app.use(cors()) // Habilita CORS para permitir requisições de diferentes origens
app.use(express.json()) // Habilita o parsing de JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })) // Habilita o parsing de dados codificados em URL
app.use(cookieParser()) // Habilita o parsing de cookies

// Rotas da API
app.use("/auth", usersAuthRouter) // Rotas para autenticação de usuários
app.use("/api/orders", ordersApiRouter) // Rotas para gerenciamento de pedidos
app.use("/api/pizzas", pizzasApiRouter) // Rotas para gerenciamento de pizzas

// Middleware de tratamento de erros
app.use(errorHandler) // Captura e trata erros de forma centralizada

// Rotas da web
app.use(pizzasWebRouter) // Rotas web relacionadas às pizzas

// Define a porta do servidor
const PORT = process.env.PORT || 3000 // Usa a porta definida no ambiente ou 3000 como padrão
app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}`)) // Inicia o servidor e exibe a URL no console