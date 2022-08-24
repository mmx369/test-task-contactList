import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'
import { unknownEndpoint } from './middleware/errors'
import { tokenExtractor } from './middleware/tokenExtractor'
import authRouter from './routes/auth'
import contactRouter from './routes/contacts'
const path = require('path')

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(tokenExtractor)

app.use('/api/auth', authRouter)
app.use('/api', contactRouter)

app.get('*', (req: Request, res: Response) => {
  const options = {
    root: path.join(__dirname, 'build'),
  }

  res.sendFile('index.html', options)
})

app.use(unknownEndpoint)

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then((result) => {
    console.log('[server]: Connected to MongoDB')
    app.listen(port, () => {
      console.log(`[server]: Server is running at https://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
