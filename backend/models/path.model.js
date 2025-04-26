import mongoose from 'mongoose'

const nodeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    type: String,
    position: {
        x: Number,
        y: Number,
    },
    data: {
        label: String,
    },
    resources: [{
        type: String,
        title: String,
        url: String
    }
    ]
}, {_id: false})

const edgeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'step'
    },
    label: {
        type: String,
    },
    animated: {
        type: Boolean,
        default: true
    }
}, {_id: false})

const pathSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    nodes: [nodeSchema],
    edges: [edgeSchema]
}, {timestamps: true})

export default mongoose.model('path', pathSchema)