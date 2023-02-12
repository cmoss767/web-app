import { Prisma, User } from "@prisma/client"
import bcrypt from "bcryptjs"
import { Request, Response } from "express"

import generateUserTokens from "./utils/generateUserToken"
import errorHandler, { StatusError } from "../utils/errorHandler"

const create = async (req: Request, res: Response) => {
  try {
    const userToCreate = res.locals?.data.body as User

    if (userToCreate.phone) {
      const phoneExists = await res.locals.prisma.user.findFirst({
        where: {
          phone: userToCreate.phone,
        },
      })

      if (phoneExists) {
        throw new StatusError(
          "An account with this phone number already exists",
          402
        )
      }
    }

    if (userToCreate.email) {
      const emailExists = await res.locals.prisma.user.findFirst({
        where: {
          email: userToCreate.email,
        },
      })

      if (emailExists) {
        throw new StatusError("An account with this email already exists", 402)
      }
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userToCreate.password, salt)
    userToCreate.password = hash

    for (const k of Object.keys(userToCreate)) {
      const key = k as keyof User
      if (!userToCreate[key]) {
        delete userToCreate[key]
      }
    }

    const user = await res.locals.prisma.user.create({
      data: userToCreate as Prisma.XOR<
        Prisma.UserCreateInput,
        Prisma.UserUncheckedCreateInput
      >,
    })

    // generate login tokens
    await generateUserTokens(user.id, res)

    return res.status(200).json({
      message: "success",
      data: user,
    })
  } catch (err) {
    return errorHandler(res, err, "Error creating user")
  }
}

export default create
