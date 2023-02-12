import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

import errorHandler, { StatusError } from "../../utils/errorHandler"

const checkUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token
    let parsedToken
    let attempts = 0

    // Check for access token
    if (!token && attempts < 1) {
      attempts++
      throw new StatusError("JWT must be provided", 400)
    }

    // Parse token and throw error if expired or invalid
    try {
      parsedToken = jwt.verify(token, process.env.JWT_SECRET || "")
    } catch (error) {
      let message = "Error validating token"
      if (error instanceof Error && error.name === "TokenExpiredError") {
        message = "Token has expired"
      }
      throw new StatusError(message, 401)
    }

    if (!parsedToken) {
      throw new StatusError("Error validating token", 401)
    }

    if (typeof parsedToken !== "object") {
      throw new StatusError("Malformed JWT", 400)
    }

    res.locals.parsedToken = parsedToken

    // Check that user exists and has a refresh token
    res.locals.user = await res.locals.prisma.user.findFirst({
      where: {
        id: parsedToken.id,
      },
    })

    if (!res.locals?.user) {
      throw new StatusError("Error getting user data", 401)
    }

    if (res.locals?.user?.refresh_token === null) {
      throw new StatusError("User has been logged out", 401)
    }
  } catch (err) {
    return errorHandler(res, err, "Error validating user")
  }
  return next()
}

export default checkUserToken
