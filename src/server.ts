import express from "express"
import path from "node:path"
import cors from "cors"
import usersApiRouter from "./routes/api/usersApiRouter"
import ordersApiRouter from "./routes/api/ordersApiRouter"
import pizzasApiRouter from "./routes/api/pizzasApiRouter"
import pizzasWebRouter from "./routes/web/pizzasWebRouter"
import { errorHandler } from "./middlewares/error-middleware"

const app = express()

app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//rotas da api
app.use("/api", usersApiRouter)
app.use("/api/orders", ordersApiRouter)
app.use("/api/pizzas", pizzasApiRouter)

//middleware de tratamento de erro
app.use(errorHandler)

//rotas da web
app.use(pizzasWebRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor iniciado em http://localhost:${PORT}`))