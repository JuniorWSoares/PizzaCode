import express from "express"
import path from "node:path"
import cors from "cors"
import usersAuthRouter from "./routes/api/usersAuthRouter"
import ordersApiRouter from "./routes/api/ordersApiRouter"
import pizzasApiRouter from "./routes/api/pizzasApiRouter"
import pizzasWebRouter from "./routes/web/pizzasWebRouter"
import { errorHandler } from "./middlewares/error-middleware"
import cookieParser from "cookie-parser"

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static("public"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//rotas da api
app.use("/auth", usersAuthRouter)
app.use("/api/orders", ordersApiRouter)
app.use("/api/pizzas", pizzasApiRouter)

//middleware de tratamento de erro
app.use(errorHandler)

//rotas da web
app.use(pizzasWebRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}`))