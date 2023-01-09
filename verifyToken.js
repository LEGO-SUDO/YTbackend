import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req, res, next) => {
  req.cookie('access_token', token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })
  //const token = req.cookies.access_token
  if (!token) return next(createError(401, 'You are not authenticated'))
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is not Valid'))
    req.user = user
    next()
  })
}
