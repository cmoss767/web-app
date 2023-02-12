import { Request, Response } from "express"

import errorHandler, { StatusError } from "../utils/errorHandler"

const getProfile = (req: Request, res: Response) => {
  try {
    const userId = res.locals?.user?.id
    const user = res.locals.prisma.user.findFirst({
      where: {
        id: userId,
      },
    })
    return res.status(200).json({
      message: "success",
      data: user,
    })
  } catch (err) {
    return errorHandler(res, err, "Error getting profile")
  }
}

export default getProfile
