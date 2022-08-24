import { NextFunction, Request, Response } from 'express'

export const tokenExtractor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    res.token = authorization.substring(7)
  } else {
    res.token = null
  }
  next()
}
