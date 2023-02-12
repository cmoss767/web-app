import express from "express"
import "dotenv/config"
import { PrismaClient } from "@prisma/client"

const app = express()
const prisma = new PrismaClient()

app.listen(process.env.PORT, ()=>{
    console.info(`Server running on port ${process.env.PORT}`)
    console.info(`Sucessfully connect to db ${process.env.DB_NAME}`)
})

