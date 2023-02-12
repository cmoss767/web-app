import { Response } from "express"
import jwt from "jsonwebtoken"

const generateUserToken = async (userId: number, res: Response) => {
  // Generate JWT token and refresh token

  const createToken = async (user: object) => {
    return jwt.sign(user, process.env.JWT_SECRET || "", {
      expiresIn: process.env.JWT_EXPIRATION || "5m",
    })
  }
  const token = await createToken({ id: userId })

  // Set cookies
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: true,
    maxAge: Number(process.env.COOKIE_MAX_AGE) || undefined,
    sameSite: process.env.NODE_ENV !== "dev" ? "none" : "none",
  })
}

export default generateUserToken
