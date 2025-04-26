import express from 'express'
import { getReccomendations } from '../controllers/course.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/", authMiddleware, getReccomendations)

export default router