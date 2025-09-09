import express from "express"
import boards from "./routes/board.route"
import * as dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(express.json())

app.use("/boards", boards)

app.listen(process.env.PORT, () => {
    console.log(`API on http://localhost:${process.env.PORT}`);
})
