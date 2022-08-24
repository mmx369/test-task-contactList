import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Contact from '../models/contact'
import User from '../models/user'

interface JwtPayload {
  id?: string
}

export const getSingleContact = async (req: Request, res: Response) => {
  if (!res.token) {
    return res.status(401).json({ error: 'token missing' })
  }

  let decodedToken

  try {
    decodedToken = jwt.verify(
      res.token,
      process.env.SECRET as string
    ) as JwtPayload
  } catch (e) {
    res.status(401).json({ error: e })
  }

  if (!res.token || !decodedToken?.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const contact = await Contact.findById(req.params.id)
  res.json(contact)
}

export const getAllContacts = async (req: Request, res: Response) => {
  if (!res.token) {
    return res.status(401).json({ error: 'token missing' })
  }

  let decodedToken
  decodedToken = jwt.verify(
    res.token,
    process.env.SECRET as string
  ) as JwtPayload

  if (!res.token || !decodedToken?.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const contacts = await Contact.find({})
    res.json(contacts)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export const addNewContact = async (req: Request, res: Response) => {
  const { name, phone, address } = req.body

  const decodedToken = jwt.verify(
    res.token as string,
    process.env.SECRET as string
  ) as JwtPayload

  if (!res.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return res.status(401).json({ error: 'User not found' })
  }

  const contact = new Contact({
    name,
    phone,
    address,
    user: user._id,
  })
  try {
    const savedContact = await contact.save()
    res.status(201).json(savedContact)
  } catch (error) {
    if (error instanceof Error) {
      if (error.code === 11000) {
        res.status(400).json({ error: 'Contact name must be unique.' })
      }
    }
    res.status(500).json({ error: 'Something went wrong. Try later.' })
  }
}

export const deleteContact = async (req: Request, res: Response) => {
  if (!res.token) {
    return res.status(401).json({ error: 'token missing' })
  }

  let decodedToken
  decodedToken = jwt.verify(
    res.token,
    process.env.SECRET as string
  ) as JwtPayload

  if (!res.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    await Contact.findByIdAndRemove(req.params.id)
    const contacts = await Contact.find({})
    res.json(contacts)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export const updateContact = async (req: Request, res: Response) => {
  const { name, phone, address, id } = req.body

  if (!res.token) {
    return res.status(401).json({ error: 'token missing' })
  }

  let decodedToken

  try {
    decodedToken = jwt.verify(
      res.token,
      process.env.SECRET as string
    ) as JwtPayload
  } catch (e) {
    res.status(401).json({ error: e })
  }

  if (!res.token || !decodedToken?.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        address,
      },
      { runValidators: true }
    )
    res.json(contact)
  } catch (err) {
    console.log(err)

    res.status(401).json({ error: 'something went wrong' })
  }
}
