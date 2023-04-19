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

const router = express.Router()
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
      'https://legotube.onrender.com',
      'http://localhost:3000',
      'https://vocal-sprite-dd6c42.netlify.app',
    ],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Content-Type',
      'Authorization',
    ],
  })
)

var allowlist = [
  'https://legotube.onrender.com',
  'https://vocal-sprite-dd6c42.netlify.app',
  'https://videostubestream.netlify.app/',
]
var corsOptionsDelegate = function (req, callback) {
  var corsOptions
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cookieParser())

app.use(express.json())

app.use('/api/auth', cors(corsOptionsDelegate), authRoutes)
app.use('/api/users', cors(corsOptionsDelegate), userRoutes)
app.use('/api/videos', cors(corsOptionsDelegate), videoRoutes)
app.use('/api/comments', cors(corsOptionsDelegate), commentRoutes)

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
