import express, { Request, Response } from "express"
import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import userRouter from "./routes/users/routes"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()
export const prisma = new PrismaClient()

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5173"],
  })
)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/users", userRouter)

app.listen(process.env.PORT, () => {
  console.info(`Server running on port ${process.env.PORT}`)
  console.info(`Sucessfully connect to db ${process.env.DB_NAME}`)
})
