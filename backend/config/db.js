import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log("Connection established!")
    } catch(error){
        console.log("Error: " + error)
    }
}