import mongoose from 'mongoose'

const discussSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    tags: [String],
    comments: [
        {
            user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
            content: String,
            createdAt: {type: Date, default: Date.now}
        }
    ]
}, {timestamps: true})

export default mongoose.model("discuss", discussSchema)