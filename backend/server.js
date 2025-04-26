import cors from 'cors'
import express from 'express'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.route.js'
import courseRoutes from './routes/course.route.js'
import discussRoutes from './routes/discuss.route.js'
import codeRoutes from './routes/code.route.js'
import pathRoutes from './routes/path.route.js'
import linkRoutes from './routes/link.route.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/course', courseRoutes)
app.use("/api/discuss", discussRoutes)
app.use("/api/code", codeRoutes)
app.use("/api/path", pathRoutes)
app.use("/api/link", linkRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})