import express from "express"
import boards from "./routes/board.route"
import * as dotenv from "dotenv"
import {errorHandler} from "./middleware/errorHandler";
dotenv.config()

export function createServer() {
    const app = express()
    // Middleware
    app.use(express.json())
    // Rutas
    app.use("/boards", boards)
    // El error handler al final, para agarrar todo
    app.use(errorHandler)

    return app
}