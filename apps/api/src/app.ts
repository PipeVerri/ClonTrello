import express from "express"
import boards from "./routes/board.route"
import * as dotenv from "dotenv"
import {errorHandler} from "./middleware/errorHandler";
dotenv.config()
import {pinoHttp} from "pino-http";

export function createServer() {
    const app = express()
    // Middleware
    app.use(express.json())
    app.use(pinoHttp())
    // Rutas
    app.use("/boards", boards)
    // El error handler al final, para agarrar todo
    app.use(errorHandler)

    return app
}