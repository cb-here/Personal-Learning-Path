import express from 'express'
import { registerUser, loginUser, userProfile } from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile",authMiddleware, userProfile)

export default router