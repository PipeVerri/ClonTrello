import {createServer} from "./app";

const port = process.env.PORT
const app = createServer()
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

