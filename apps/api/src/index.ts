import express from "express"

const app = express()



app.listen(process.env.PORT, () => {
    console.log(`API on http://localhost:${process.env.PORT}`);
})
