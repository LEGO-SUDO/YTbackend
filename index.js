import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import videoRoutes from './routes/videos.js'
import commentRoutes from './routes/comments.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()

const port = process.env.PORT || 8800

const app = express()

const connect = () => {
  mongoose
    .set('strictQuery', false)
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to DB')
    })
    .catch((err) => {
      throw err
    })
}

app.use(
  cors({
    origin: [
      'https://vocal-sprite-dd6c42.netlify.app',
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  })
)

app.options(
  '/api/users/like/63b830735d7cf3adf689f1d4',
  cors({
    origin: [
      'https://vocal-sprite-dd6c42.netlify.app',
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  })
)

app.use(cookieParser())

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/comments', commentRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong'
  return res.status(status).json({
    success: false,
    status: status,
    message,
  })
})
app.listen(port, () => {
  connect()
  console.log('Connected')
})
