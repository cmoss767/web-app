import express from "express"
import "dotenv/config"

const app = express()

app.listen(process.env.PORT, ()=>{
    console.info(`Server running on port ${process.env.PORT}`)
})

