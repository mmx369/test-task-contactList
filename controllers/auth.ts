import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string }
  if (email === undefined) {
    return res.status(400).json({ error: 'Email must be provided' })
  }

  const user = await User.findOne({ email }).exec()
  if (user) {
    return res.status(400).json({ error: 'User already exist' })
  }

  if (password === undefined || password.length < 5) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 5 characters' })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      email,
      passwordHash,
    })

    try {
      const savedUser = await user.save()
      res.status(201).json({ msg: `User ${savedUser.email} created!` })
    } catch (err) {
      console.log(err)
    }
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string }
  const user = await User.findOne({ email })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid email or password.',
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET as string, {
    expiresIn: '336h',
  })

  res.status(200).send({ token, userForToken })
}
