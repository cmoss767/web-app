import express from "express"
import checkUserToken from "./utils/checkUserToken"
import getProfile from "./getProfile"

const userRouter = express.Router()

// GET
userRouter.get("/me", checkUserToken, getProfile)

// POST

export default userRouter
