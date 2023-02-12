import { PrismaClient } from "@prisma/client"
import createUser from "./users"

const prisma = new PrismaClient()

const promiseArr: Promise<void>[] = []

promiseArr.push(createUser(prisma).then(() => undefined))

Promise.all(promiseArr).then(() => {
  prisma.$disconnect()
})
