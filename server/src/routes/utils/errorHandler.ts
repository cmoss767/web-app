import { Response } from "express"

export class StatusError extends Error {
  status: number

  constructor(msg: string, status = 500) {
    super(msg)
    this.status = status

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, StatusError.prototype)
  }
}

const errorHandler = (
  res: Response,
  err: unknown,
  defaultMessage = "Internal Server Error"
) => {
  // eslint-disable-next-line no-console
  console.log(err)

  let statusCode = 500
  let errorMessage = defaultMessage
  if (err instanceof StatusError) {
    statusCode = err.status
    errorMessage = err.message
  }

  if (!res.headersSent) {
    return res
      .status(statusCode)
      .json({ message: "error", error: errorMessage })
  }
}

export default errorHandler
