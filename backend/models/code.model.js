import mongoose from 'mongoose'

const codeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,  
    },
    language: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }  
 }, {timestamps: true})
 
const Code = mongoose.model("Code", codeSchema)
export default Code