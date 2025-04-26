import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: [String],
    level: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

export default mongoose.model("course", courseSchema)