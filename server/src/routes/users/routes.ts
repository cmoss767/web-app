import express from "express"
import checkUserToken from "./utils/checkUserToken"
import getProfile from "./getProfile"
import create from "./create"
import auth from "./auth"

const userRouter = express.Router()

// GET
userRouter.get("/me", checkUserToken, getProfile)

// POST
userRouter.post("/auth", auth)
userRouter.post("/create", create)

export default userRouter
