import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {timestamps: true})

export default mongoose.model("Link", linkSchema)