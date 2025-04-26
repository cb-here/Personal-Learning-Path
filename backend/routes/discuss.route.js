import express from 'express'
import { addComment, createDiscussion, getDiscussionById, getDiscussions } from '../controllers/discusss.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/", getDiscussions)
router.get("/:id", getDiscussionById)
router.post("/", authMiddleware, createDiscussion)
router.post("/:id/comment", authMiddleware, addComment)

export default router