import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const createUser = async (prisma: PrismaClient) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync("chrisMoss123!", salt)
  return await prisma.user.create({
    data: {
      first_name: "Chris",
      last_name: "Moss",
      email: "hcmoss70@gmail.com",
      password: hash,
    },
  })
}

export default createUser
