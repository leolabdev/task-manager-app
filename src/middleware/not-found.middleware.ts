import { Request, Response } from 'express'

const notFoundHandler = (req: Request, res: Response) => {
  const message = 'Resource not found'

  res.status(404).send(message)
}

export { notFoundHandler }
