import express from 'express'
import {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from '../Controller/user.js'
import { verifyToken } from '../verifyToken.js'
import cors from 'cors'
const router = express.Router()

//Update user
router.put('/:id', verifyToken, updateUser)

//delete a user
router.delete('/:id', verifyToken, deleteUser)
//get a user
router.get('/find/:id', getUser)

//subscribe  a user
router.put('/sub/:id', verifyToken, subscribe)

//unsubscribe a user
router.put('/unsub/:id', verifyToken, unsubscribe)

//like a video
router.put('/like/:videoId', verifyToken, like)

//dislike a video
router.put('/dislike/:videoId', verifyToken, dislike)

export default router
