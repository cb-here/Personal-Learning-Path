import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import {addLink, deleteLink, getLinks} from '../controllers/link.controller.js'

const router = express.Router()

router.post("/", authMiddleware, addLink)
router.get("/", authMiddleware, getLinks)
router.delete("/:id", authMiddleware, deleteLink)


export default router