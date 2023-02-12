import { User } from "@prisma/client/index"
import bcrypt from "bcryptjs"
import { Request, Response } from "express"

import errorHandler, { StatusError } from "../utils/errorHandler"

import generateUserTokens from "./utils/generateUserToken"

const userAuth = async (req: Request, res: Response) => {
  try {
    const body = res.locals?.data?.body as Partial<User>

    if (!body.phone && !body.email) {
      throw new StatusError("Email or phone must be provided", 400)
    }

    const user = await res.locals.prisma.user.findFirst({
      where: {
        email: body.email,
        phone: body.phone,
      },
      select: {
        id: true,
        password: true,
      },
    })

    if (!user) {
      throw new StatusError(
        "Unable to login, check your phone number or password and try again",
        400
      )
    }

    // Check password is not nullish
    if (!body.password) {
      throw new StatusError("Error authenticating user", 400)
    }

    // Validate password
    if (!user.password) {
      throw new StatusError("No password set", 400)
    }

    if (!bcrypt.compareSync(body.password, user.password)) {
      throw new StatusError("Invalid credentials", 400)
    }

    // Get user data
    const selectedUser = await res.locals.prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        phone: true,
        email: true,
      },
    })

    // generate login tokens
    await generateUserTokens(user.id, res)

    return res
      .status(200)
      .json({ message: "Authenticated", data: selectedUser })
  } catch (err) {
    return errorHandler(res, err, "Error authenticating user")
  }
}

export default userAuth
