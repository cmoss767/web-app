import express from "express"
import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import userRouter from "./routes/users/routes"

const app = express()
const prisma = new PrismaClient()

app.use("/users", userRouter)

app.listen(process.env.PORT, () => {
  console.info(`Server running on port ${process.env.PORT}`)
  console.info(`Sucessfully connect to db ${process.env.DB_NAME}`)
})
