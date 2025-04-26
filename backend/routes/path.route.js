import express from 'express'
import {getPath, getPaths, savePath} from '../controllers/path.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/", getPaths)
router.get("/:id", authMiddleware, getPath)
router.post("/", authMiddleware, savePath)

export default router